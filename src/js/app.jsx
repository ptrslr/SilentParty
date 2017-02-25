'use strict';

// require('./vendor/angular.min.js');\
// require('./vendor/soundcloud-audio.min.js');

import React from 'react';
import ReactDOM from 'react-dom';
import Icon from 'react-geomicons';
import SC from 'soundcloud';

var CLIENT_ID = 'bc2740865fc8d120b6df98beae813823',
    // audioCtx = new AudioContext(),
    audio,
    audioURL = 'https://soundcloud.com/roundmidnights/sets/kaytranada';
    // isPlaying = false,
    // scPlayer = new SoundCloudAudio(CLIENT_ID);

/**
 * @param  time in miliseconds
 * @return time as string in format hh:mm
 */
function getTime(t) {
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000) / 60);

    // slice so the seconds are always 2 digits
    return minutes + ":" + ("0" + seconds).slice(-2);
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            audioURL: audioURL
        });

        this.updateAudioURL = this.updateAudioURL.bind(this);
    }
    updateAudioURL(value) {
        this.setState({
            audioURL: value
        }, function() {
            this.player.resolveAudio();
        });

        // console.log(value);
    }
    render() {
        return (
            <div className="container">
                <AudioURL value={this.state.audioURL} onSubmit={this.updateAudioURL} />
                <Player audioURL={this.state.audioURL} ref={(player) => {this.player = player;}} />
            </div>
        )
    }
}

class AudioURL extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            value: e.target.value
        });
        // this.props.onChange(e.target.value);
    }
    handleSubmit(e) {
        // alert('A name was submitted: ' + this.state.value);
        e.preventDefault();
        this.props.onSubmit(this.state.value);
    }
    render() {
        return (
            <div className="audioURL">
                <h2 className="audioURL-title">Submit a <a href="https://soundcloud.com" target="_blank">soundcloud</a> URL</h2>
                <form className="audioURL-main mx-auto w-sm-6" onSubmit={this.handleSubmit} >
                    <input id="audioURL-input" className="audioURL-input" type="text" placeholder={this.state.value} value={this.state.value} onChange={this.handleChange} />
                    <button id="audioURL-submit" className="audioURL-submit" type="submit">submit</button>
                </form>
            </div>
        );
    }
}

class Player extends React.Component {
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
            $this.setState({
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

            this.setState({
                isPlaying: true,
                currentTrackNo: no,
                currentTrackId: track.id,
                currentTrackDuration: track.duration,
                currentTrackTime: 0,
                audioData: track,
                username: track.user.username,
                title: track.title,
                img: track.artwork_url ? track.artwork_url : track.user.avatar_url,
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
            <article className="player mx-auto">
                <h1 className="playerTitle">
                    <small className="playerTile-username h4 regular">
                        <a href="#" target="_blank">{this.state.username}</a>
                    </small>
                    <div className="playerTitle-trackname truncate">
                        <a href="#" target="_blank">{this.state.title}</a>
                    </div>
                </h1>
                <div className="playerTime">{getTime(this.state.currentTrackTime)} - {getTime(this.state.currentTrackDuration)}</div>
                {/* <a href="#" target="_blank">
                    <img className="mb3" src={this.state.img} />
                </a> */}
                <div className="playerControls mx-auto flex items-center justify-center">
                    <div className="playerControls-bg" style={{backgroundImage: 'url(' + this.state.img + ')'}}></div>
                    <button className="playerControl playerControl--previous" type="button" onClick={this.previous} disabled={this.state.currentTrackNo === 0}>
                        <Icon name="previous" className="icon icon-prev" />
                    </button>
                    <button className="playerControl playerControl--play"  type="button" onClick={this.playPause}>
                        {this.state.isPlaying ? <Icon name="pause" className="icon icon-pause" /> : <Icon name="play" className="icon icon-play" />}
                    </button>
                    <button className="playerControl playerControl--next" type="button" onClick={this.next} disabled={this.state.currentTrackNo === this.state.tracks.length - 1}>
                        <Icon name="next" className="icon icon-next" />
                    </button>
                </div>

                <Playlist tracks={this.state.tracks} playerIsPlaying={this.state.isPlaying} playPause={this.playPause} currentTrackId={this.state.currentTrackId} playByTrackNo={this.playByTrackNo} ref={(playlist) => {this.playlist = playlist;}}/>
            </article>
        );
    }
}

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        // console.log(playlistItems);
        this.state = {
            playlistItems: this.props.tracks
        }

        this.handleClick = this.handleClick.bind(this);
    }

    resolvePlaylist() {
        let playlistItems = this.props.tracks.map((track) =>
            <PlaylistTrack isActive={track.id === this.props.currentTrackId} playerIsPlaying={this.props.playerIsPlaying} key={track.id} track={track} id={track.id} no={this.props.tracks.indexOf(track)} onClick={this.handleClick}/>);
        // console.log(playlistItems);
        this.setState({
            playlistItems: playlistItems
        });
    }

    handleClick(no) {
        this.props.playByTrackNo(no);
        // console.log(this.props.currentTrackId, id);
    }

    render() {
        return (
            <div className="mx-auto mt3 max-width-3">
                <h2 className="hidden">Playlist</h2>
                <ol className="playlist left-align list-reset">
                    {this.state.playlistItems}
                </ol>
            </div>
        );
    }
}

class PlaylistTrack extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onClick(this.props.no);
    }

    render() {
        return (
            <li className={"playlistTrack flex py1 px2 " + (this.props.isActive ? 'is-active' : '')} onClick={this.handleClick}>
                <div className="playlistTrack-number mr1">{this.props.no + 1}</div>
                <div className="playlistTrack-title truncate">
                    <span className="playlistTrack-username">{this.props.track.user.username}</span>
                    &nbsp;&ndash;&nbsp;
                    <strong className="playlistTrack-trackname">{this.props.track.title}</strong>
                </div>
                <div className="playlistTrack-indicator ml1 mr1">
                    <Icon name="play" className="icon icon-play"/>
                    <Icon name="pause" className="icon icon-pause"/>
                </div>
                <div className="playlistTrack-duration ml-auto">{getTime(this.props.track.duration)}</div>
            </li>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);