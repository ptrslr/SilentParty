import React from 'react';
import ReactDOM from 'react-dom';
import SC from 'soundcloud';
import Playlist from './Playlist.js';
import Icon from './Icon';

var CLIENT_ID = 'bc2740865fc8d120b6df98beae813823';
var audio;

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShown: true,
            isPlaying: false,
            currentTrackId: null,
            currentTrackNo: 0,
            currentTrackDuration: 0,
            currentTrackTime: 0,
            audioData: {},
            username: '',
            title: '',
            img: '',
            streamURL: '',
            tracks: [],
        };

        this.playPause = this.playPause.bind(this);
        this.playByTrackNo = this.playByTrackNo.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);

        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.handleTrackEnded = this.handleTrackEnded.bind(this);
    }
    componentDidMount() {
        let audioData;
        let $this = this;

        audio = new Audio();
        audio.addEventListener('ended', this.handleTrackEnded);
        // audio.addEventListener('timeupdate', this.handleTimeUpdate);

        this.timerID = setInterval(() => this.handleTimeUpdate(), 1000);

        SC.initialize({
            client_id: CLIENT_ID
        });

        this.resolveAudio();
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    /**
     * @param  time in miliseconds
     * @return time as string in format hh:mm
     */
    getTime(t) {
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000) / 60);

        // slice so the seconds are always 2 digits
        return minutes + ":" + ("0" + seconds).slice(-2);
    }

    getStreamURL(track) {
        const result = track.stream_url + '?client_id=' + CLIENT_ID;

        return result;
	}

    resolveAudio() {
        let $this = this;
        SC.resolve(this.props.audioURL).then(function(result) {
            console.log(result);

            let audioData = result;
            let kind = audioData.kind;
            let tracks = [];

            if (kind === "playlist") {
                tracks = audioData.tracks;
            } else {
                tracks.push(audioData);
            }

            let user = audioData.user;
            let username = user.username;
            let title = audioData.title;

            let img = tracks[0].artwork_url ? tracks[0].artwork_url : tracks[0].user.avatar_url;
            img = img.replace(/(.*)(-large)(\..*)/, '$1-t500x500$3');
            // console.log(img);

            let currentTrackId = tracks[0].id;
            let streamURL = $this.getStreamURL(tracks[0]);

            $this.setState({
                isPlaying: false,
                currentTrackNo: 0,
                currentTrackId: currentTrackId,
                currentTrackDuration: tracks[0].duration,
                audioData: result,
                username: username,
                title: title,
                img: img,
                streamURL: streamURL,
                tracks: tracks
            }, function() {
                audio.src = streamURL;
                $this.playPause();
                $this.playlist.resolvePlaylist();
            })

            // console.log($this.state);
        }, function(err) {
            alert('Error resolving audio...perhaps bad url?' + err);
        });
    }

    handleTrackEnded() {
		// console.log('ended');


        if (this.state.currentTrackNo === this.state.tracks.length - 1) {
            this.setState({
                isPlaying: false
            })
        } else {
            this.playByTrackNo(this.state.currentTrackNo + 1);
        }
    }
    handleTimeUpdate() {
        this.setState({
            currentTrackTime: audio.currentTime * 1000
        })
    }
    playByTrackNo(no) {
        if (no === this.state.currentTrackNo) {
            this.playPause();
        } else {
            let track = this.state.tracks[no];
            let img = track.artwork_url ? track.artwork_url : track.user.avatar_url;
            img = img.replace(/(.*)(-large)(\..*)/, '$1-t500x500$3');


            this.setState({
                isPlaying: true,
                currentTrackNo: no,
                currentTrackId: track.id,
                currentTrackDuration: track.duration,
                currentTrackTime: 0,
                audioData: track,
                username: track.user.username,
                title: track.title,
                img: img,
                streamURL: this.getStreamURL(track),
            }, function() {
                audio.src = this.state.streamURL;
                this.play();
                this.playlist.resolvePlaylist();
            })
        }
    }
    playPause() {
        if (this.state.isPlaying) {
            // console.log('pause that shit');

            this.pause();
            this.setState({
                isPlaying: false
            })
        } else {
            // console.log('pump up the jam');

            this.play();
            this.setState({
                isPlaying: true
            })
        }
    }
    play() {
        audio.play();
    }
    pause() {
        clearInterval()
        audio.pause();
    }
    previous () {
        let currentTrackNo = this.state.currentTrackNo;
        this.playByTrackNo(currentTrackNo - 1 >= 0 ? currentTrackNo - 1 : 0)
    }
    next() {
        let currentTrackNo = this.state.currentTrackNo;
        this.playByTrackNo(currentTrackNo + 1 < this.state.tracks.length ? currentTrackNo + 1 : this.state.tracks.length - 1)
    }
    render() {
        if (!this.state.isShown) {
            return null;
        }
        return (
            <article className="player mx-auto tc">
                <h1 className="playerTitle mw6 center">
                    <small className="playerTile-username f6 b ttu tracked silver">
                        <a href="#" target="_blank">{this.state.username}</a>
                    </small>
                    <div className="playerTitle-trackname truncate">
                        <a href="#" target="_blank">{this.state.title}</a>
                    </div>
                </h1>
                <div className="playerTime mb1">{this.getTime(this.state.currentTrackTime)} - {this.getTime(this.state.currentTrackDuration)}</div>
                {/* <a href="#" target="_blank">
                    <img className="mb3" src={this.state.img} />
                </a> */}
                <div>
                    <div className="playerControls center ">
                        <div className="playerControls-bg" style={{backgroundImage: 'url(' + this.state.img + ')'}}></div>
                        <div className="playerControls-main flex items-center justify-center">
                            <button className="playerControl playerControl--previous" type="button" onClick={this.previous} disabled={this.state.currentTrackNo === 0}>
                              <Icon name="previous" />
                            </button>
                            <button className="playerControl playerControl--play"  type="button" onClick={this.playPause}>
                                {this.state.isPlaying
                                  ? <Icon name="pause" />
                                  : <Icon name="play" />
                                }
                            </button>
                            <button className="playerControl playerControl--next" type="button" onClick={this.next} disabled={this.state.currentTrackNo === this.state.tracks.length - 1}>
                                <Icon name="next" />
                            </button>
                        </div>
                    </div>
                </div>

                <Playlist tracks={this.state.tracks} playerIsPlaying={this.state.isPlaying} playPause={this.playPause} currentTrackId={this.state.currentTrackId} playByTrackNo={this.playByTrackNo} ref={(playlist) => {this.playlist = playlist;}} getTime={this.getTime} />
            </article>
        );
    }
}
