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
    audioURL = 'https://soundcloud.com/orijanus/15oj';
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
            this.player.updatePlayer();
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
            isPlaying: false,
            isShown: true,
            audioData: {},
            username: '',
            title: '',
            img: '',
            streamURL: ''
        };

        this.playPause = this.playPause.bind(this);
    }
    resolveAudio() {
        let $this = this;
        SC.resolve(this.props.audioURL).then(function(result) {
            // console.log(result);

            let audioData = result;

            let user = audioData.user;
            let username = user.username;
            let title = audioData.title;
            let img = audioData.artwork_url ? audioData.artwork_url : user.avatar_url;
            let streamURL = audioData.stream_url + '?client_id=' + CLIENT_ID;

            $this.setState({
                isPlaying: false,
                audioData: result,
                username: username,
                title: title,
                img: img,
                streamURL: streamURL
            }, function() {
                audio.src = $this.state.streamURL;
            })

            console.log($this.state);
        }, function(err) {
            alert(err);
        });
    }
    updatePlayer() {
        this.resolveAudio();
    }
    componentDidMount() {
        let audioData;
        let $this = this;

        SC.initialize({
            client_id: CLIENT_ID
        });
        SC.resolve(this.props.audioURL).then(function(result) {
            console.log(result);

            $this.setState({
                audioData: result
            });
            $this.updatePlayer();

            // const streamURL = result.stream_url + '?client_id=' + CLIENT_ID;
            // const user = result.user;
            // const username = user.username;

            // audio.src = streamURL;
        }, function(err) {
            console.log(err);

            // audioURL = 'test.mp3';
            // audio.src = audioURL;
        });



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
                    <button className="player-control player-control--previous" type="button">
                        <Icon name="previous" className="icon icon-prev" />
                    </button>
                    <button className="player-control player-control--play"  type="button" onClick={this.playPause}>
                        {this.state.isPlaying ? <Icon name="pause" className="icon icon-pause" /> : <Icon name="play" className="icon icon-play" />}
                    </button>
                    <button className="player-control player-control--next" type="button">
                        <Icon name="next" className="icon icon-next" />
                    </button>
                </div>

                {/*<Playlist />*/}
            </article>
        );
    }
}

class Playlist extends React.Component {

    play() {

    }
    render() {
        return (
            <div className="mx-auto mt3 max-width-3">
                <h2 className="hidden">Playlist</h2>
                <ol className="playlist left-align list-reset">
                    <li className="playlistTrack flex py1 px2">
                        <div className="playlistTrack-number mr1">1</div>
                        <div className="playlistTrack-title truncate">
                            <span className="playlistTrack-username">Username</span>
                            &nbsp;&ndash;&nbsp;
                            <strong className="playlistTrack-trackname">Trackname</strong>
                        </div>
                        <div className="playlistTrack-indicator ml1">
                            <Icon name="play" />
                        </div>
                    </li>
                </ol>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);