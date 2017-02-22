// require('./vendor/angular.min.js');\
// require('./vendor/soundcloud-audio.min.js');

import React from 'react';
import ReactDOM from 'react-dom';
import Icon from 'react-geomicons';
// import SC from 'soundcloud';

var CLIENT_ID = 'bc2740865fc8d120b6df98beae813823',
    audioURL = 'https://soundcloud.com/orijanus/15oj';
    // isPlaying = false,
    // scPlayer = new SoundCloudAudio(CLIENT_ID);


class AudioURL extends React.Component {
  render() {
    return (
      <div className="audioURL">
        <h2 className="audioURL-title">Submit a <a href="https://soundcloud.com" target="_blank">soundcloud</a> URL</h2>
        <div className="audioURL-main mx-auto w-sm-6">
            <input id="audioURL-input" className="audioURL-input" type="text" placeholder={this.props.url} />
            <button id="audioURL-submit" className="audioURL-submit" type="button">submit</button>
        </div>
      </div>
    );
  }
}

class Player extends React.Component {
  render() {
    return (
      <article className="player mx-auto">
          <h1 className="player-title">
              <small className="player-title-username h4 regular">
                  <a href="#" target="_blank">Username</a>
              </small>
              <div className="player-title-trackname truncate">
                  <a href="#" target="_blank">Willo je keket</a>
              </div>
          </h1>
          <a href="#" target="_blank">
              <img className="mb3" src="http://placecage.com/128/128" />
          </a>

          <div className="player-controls">
              <button className="player-control player-control--previous" type="button">
                  <Icon name="previous" />
              </button>
              <button className="player-control player-control--play"  type="button">
                  <Icon name="play" />
              </button>
              <button className="player-control player-control--next" type="button">
                  <Icon name="next" />
              </button>
          </div>

          <Playlist />
      </article>
    );
  }
}

class Playlist extends React.Component {
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

class App extends React.Component {
  render() {
    SC.initialize({
      client_id: CLIENT_ID
    });
    // console.log(SC.get('tracks/203783512'));

    SC.resolve('https://soundcloud.com/orijanus/15oj').then(function(result) {
      console.log(result);
    }, function(err) {
      console.log(err);
    });

    return (
      <div className="container">
        <AudioURL url={audioURL}/>
        <Player />
      </div>
    )
  }
}

// https://api.soundcloud.com/tracks/203783512




// SC.stream('https://soundcloud.com/orijanus/15oj').then(function(player){
//   player.play();
// });




ReactDOM.render(
  <App />,
  document.getElementById('app')
);