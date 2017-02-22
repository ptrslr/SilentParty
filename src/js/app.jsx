// require('./vendor/angular.min.js');\
// require('./vendor/soundcloud-audio.min.js');

import React from 'react';
import ReactDOM from 'react-dom';
import Icon from 'react-geomicons';

var CLIENT_ID = 'bc2740865fc8d120b6df98beae813823',
    audioURL = 'http://soundcloud.com/jxnblk/sets/yello',
    isPlaying = false,
    scPlayer = new SoundCloudAudio(CLIENT_ID);


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
    return (
      <div className="container">
        <AudioURL url={audioURL}/>
        <Player />
      </div>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('app')
);

var scPlaylist, scPlayer;

function createPlayer() {
  if (isPlaying) {
    scPlayer.stop();
    isPlaying = false;
  }
  scPlayer = new SoundCloudAudio(CLIENT_ID);
}

var app = angular.module('silentParty', []);

app.factory('playlist', function($rootScope) {
  var playlist = {};
  playlist.tracks = [];
  playlist.trackCount = 0;

  playlist.getPlaylist = function(audioURL) {
    scPlayer.resolve(audioURL, function (scPlaylist) {
      playlist.currentTrackIndex = 0;

      playlist.tracks = scPlaylist.tracks;
      playlist.trackCount = playlist.tracks.length;
      playlist.updateCurrentTrack();

      $rootScope.$broadcast('showPlayer');
    });
  };

  playlist.isReady = function() {
    return playlist.trackCount > 0;
  };

  playlist.getCurrentTrack = function() {
    return playlist.tracks[playlist.currentTrackIndex];
  };

  playlist.updateCurrentTrack = function() {
    playlist.currentTrack = playlist.getCurrentTrack();
    playlist.currentTrackID = playlist.currentTrack.id;
    playlist.currentTrackImage = playlist.currentTrack.artwork_url;
    if (playlist.currentTrackImage !== null) {
      playlist.currentTrackImageLarge = playlist.currentTrack.artwork_url.replace('large', 't500x500');
    }
  };


  return playlist;
});

// http://stackoverflow.com/questions/17470790/how-to-use-a-keypress-event-in-angularjs
app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.controller('MainController', function(playlist) {
  var self = this;
  self.playlist = playlist;

});
app.controller('AudioSubmitController', function(playlist, $rootScope) {
  var self = this;
  self.audioURL = "https://soundcloud.com/ptrslr/sets/chill";

  self.playlist = playlist;

  self.submit = function() {
    audioURL = self.audioURL;
    createPlayer();
    playlist.getPlaylist(audioURL);
  };
  self.keydown = function() {

  };
});

app.controller('PlayerController', function(playlist, $scope) {
  var self = this;
  self.playlist = playlist;
  self.showPlayer = false;

  $scope.$on('showPlayer', function(event) {
    self.showPlayer = true;
    self.playPause();
    $scope.$apply(); // update view
  });

  self.playPause = function() {
    if (isPlaying) {
      scPlayer.pause();
      isPlaying = false;
      self.isPlaying = false;
    } else {
      scPlayer.play( {playlistIndex: playlist.currentTrackIndex} );
      // console.log(playlist.currentTrackIndex);
      isPlaying = true;
      self.isPlaying = true;
    }

  };
  self.previous = function() {
    scPlayer.previous();

    if (playlist.currentTrackIndex > 0) {
      playlist.currentTrackIndex--;
      playlist.updateCurrentTrack();
      self.isPlaying = true;
      isPlaying = true;
    }

    // console.log(playlist.currentTrackIndex);
  };
  self.next = function() {
    scPlayer.next();

    if (playlist.currentTrackIndex < playlist.trackCount - 1) {
      playlist.currentTrackIndex++;
      playlist.updateCurrentTrack();
      self.isPlaying = true;
      isPlaying = true;
    }

    // console.log(playlist.currentTrackIndex);
  };
  self.playByIndex = function(index) {
    playlist.currentTrackIndex = index;
    isPlaying = false;
    self.isPlaying = false;
    self.playPause();
    playlist.updateCurrentTrack();
    // $scope.$apply();
  };
});

app.controller('PlaylistController', function(playlist) {
  var self = this;

  self.playlist = playlist;
  self.tracks = playlist.tracks;

  self.test = function() {
    // console.log(playlist.tracks[0].title);
  };

});