'use strict';

// require('./vendor/angular.min.js');\
// require('./vendor/soundcloud-audio.min.js');

import SC from 'soundcloud';

// var React = require('react');
import React from 'react';
import ReactDOM from 'react-dom';
import Icon from 'react-geomicons';


    // audioCtx = new AudioContext(),
var audioURL = 'https://soundcloud.com/roundmidnights/sets/kaytranada';
    // isPlaying = false,
    // scPlayer = new SoundCloudAudio(CLIENT_ID);

import AudioURL from './components/AudioURL.jsx';
import Player from './components/Player.jsx';
import Playlist from './components/Playlist.jsx';
import PlaylistTrack from './components/PlaylistTrack.jsx';

// require('./components/AudioURL.jsx');
// require('./components/Player.jsx');
// require('./components/Playlist.jsx');
// require('./components/PlaylistTrack.jsx');

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

ReactDOM.render(
    <App />,
    document.getElementById('app')
);