var CLIENT_ID = 'bc2740865fc8d120b6df98beae813823',
    audioURL = 'http://soundcloud.com/jxnblk/sets/yello',
    isPlaying = false,
    scPlayer = new SoundCloudAudio(CLIENT_ID);

var scPlaylist, scPlayer;

function createPlayer() {
  scPlayer.stop();
  scPlayer = new SoundCloudAudio(CLIENT_ID);
}

createPlayer();

var app = angular.module('silentParty', []);

app.factory('playlist', function() {
  var playlist = {};
  playlist.tracks = [];
  playlist.trackCount = 0;
  playlist.nowPlaying = 0;

  playlist.getPlaylist = function(audioURL) {
    scPlayer.resolve(audioURL, function (scPlaylist) {
      // do smth with array of `playlist.tracks` or playlist's metadata
      // e.g. display playlist info in a view etc.
      // scPlaylist = playlist;
      //
      // playlist = scPlaylist;
      playlist.tracks = scPlaylist.tracks;
      playlist.trackCount = playlist.tracks.length;
      playlist.updateCurrentTrack();

      // scPlayer.play();
      // isPlaying = true;

      console.log(playlist.tracks);

      // once playlist is loaded it can be played
      // if (isPlaying) {
      //   scPlayer.play();
      // }

      // for playlists it's possible to switch to another track in queue
      // e.g. we do it here when playing track is finished
      // scPlayer.on('ended', function () {
      //   scPlayer.next();
      // });
    });
  };

  playlist.isReady = function() {
    return playlist.trackCount > 0;
  };

  playlist.getCurrentTrack = function() {
    return playlist.tracks[playlist.nowPlaying];
  };

  playlist.updateCurrentTrack = function() {
    playlist.currentTrack = playlist.getCurrentTrack();
    // playlist.currentTrackImage = playlist.currentTrack.artwork_url.replace('large', 't500x500');
    playlist.currentTrackImage = playlist.currentTrack.artwork_url;
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

app.controller('MainController', function() {
  var self = this;
  self.showPlayer = false;

});
app.controller('AudioSubmitController', function(playlist) {
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

app.controller('PlayerController', function(playlist) {
  var self = this;
  self.playlist = playlist;

  self.playPause = function() {
    if (isPlaying) {
      isPlaying = false;
      scPlayer.pause();
      self.playPauseLabel = "Play";
    } else {
      isPlaying = true;
      scPlayer.play();
      // console.log(scPlayer.playing);
      self.playPauseLabel = "Pause";
    }
    // console.log(self.title);

  };
  self.previous = function() {
    scPlayer.previous();

    // playlist.nowPlaying = (playlist.nowPlaying - 1) % playlist.trackCount;

    if (playlist.nowPlaying > 0) {
      playlist.nowPlaying--;
      playlist.updateCurrentTrack();
    }
  };
  self.next = function() {
    scPlayer.next();
    // playlist.nowPlaying = (playlist.nowPlaying + 1) % playlist.trackCount;

    if (playlist.nowPlaying < playlist.trackCount - 1) {
      playlist.nowPlaying++;
      playlist.updateCurrentTrack();
    }
  };
});

app.controller('PlaylistController', function(playlist) {
  var self = this;

  self.playlist = playlist;
  self.tracks = playlist.tracks;

  self.test = function() {
    console.log(playlist.tracks[0].title);
  };

});