'use strict';

// require('./vendor/angular.min.js');\
// require('./vendor/soundcloud-audio.min.js');

import React from 'react';
import ReactDOM from 'react-dom';
import Icon from 'react-geomicons';
import SC from 'soundcloud';

var CLIENT_ID = 'bc2740865fc8d120b6df98beae813823',
    // audioCtx = new AudioContext(),
    audio = new Audio(),
    audioURL = 'https://soundcloud.com/roundmidnights/sets/kaytranada';
    // isPlaying = false,
    // scPlayer = new SoundCloudAudio(CLIENT_ID);


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
            audioData: {},
            username: '',
            title: '',
            img: '',
            streamURL: '',
            tracks: []
        };

        this.playPause = this.playPause.bind(this);
        this.playByTrackNo = this.playByTrackNo.bind(this);
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
            let img = audioData.artwork_url ? audioData.artwork_url : user.avatar_url;
            let currentTrackId = tracks[0].id;
            let streamURL = $this.getStreamURL(tracks[0]);

            $this.setState({
                isPlaying: false,
                currentTrackNo: 0,
                currentTrackId: currentTrackId,
                audioData: result,
                username: username,
                title: title,
                img: img,
                streamURL: streamURL,
                tracks: tracks
            }, function() {
                audio.src = $this.state.streamURL;
                $this.playlist.resolvePlaylist();
            })

            // console.log($this.state);
        }, function(err) {
            alert('Error resolving audio...perhaps bad url?' + err);
        });
    }
    componentDidMount() {
        let audioData;
        let $this = this;

        SC.initialize({
            client_id: CLIENT_ID
        });

        this.resolveAudio();
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
                audioData: track,
                username: track.user.username,
                title: track.title,
                img: track.artwork_url ? track.artwork_url : track.user.avatar_url,
                streamURL: this.getStreamURL(track),
            }, function() {
                audio.src = this.state.streamURL;
                audio.play();
                this.playlist.resolvePlaylist();
            })
        }
    }
    playPause() {
        if (this.state.isPlaying) {
            console.log('pause that shit');

            this.pause();
            this.setState({
                isPlaying: false
            })
        } else {
            console.log('pump up the jam');

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
        audio.pause();
    }
    render() {
        if (!this.state.isShown) {
            return null;
        }
        return (
            <article className="player mx-auto">
                <h1 className="player-title">
                    <small className="player-title-username h4 regular">
                        <a href="#" target="_blank">{this.state.username}</a>
                    </small>
                    <div className="player-title-trackname truncate">
                        <a href="#" target="_blank">{this.state.title}</a>
                    </div>
                </h1>
                <a href="#" target="_blank">
                    <img className="mb3" src={this.state.img} />
                </a>
                <div className="player-controls">
                    <button className="player-control player-control--previous" type="button" disabled>
                        <Icon name="previous" className="icon icon-prev" />
                    </button>
                    <button className="player-control player-control--play"  type="button" onClick={this.playPause}>
                        {this.state.isPlaying ? <Icon name="pause" className="icon icon-pause" /> : <Icon name="play" className="icon icon-play" />}
                    </button>
                    <button className="player-control player-control--next" type="button" disabled>
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
                <div className="playlistTrack-indicator ml1">
                    <Icon name="play" className="icon icon-play"/>
                    <Icon name="pause" className="icon icon-pause"/>
                </div>
            </li>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);