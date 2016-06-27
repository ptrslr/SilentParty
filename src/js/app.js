var CLIENT_ID = 'bc2740865fc8d120b6df98beae813823',
    audioURL = 'http://soundcloud.com/jxnblk/sets/yello',
    isPlaying = false,
    scPlayer = new SoundCloudAudio(CLIENT_ID);

var scPlaylist, scPlayer;

function createPlayer() {
  scPlayer.stop();
  scPlayer = new SoundCloudAudio(CLIENT_ID);
}

var app = angular.module('silentParty', []);

app.factory('playlist', function($rootScope) {
  var playlist = {};
  playlist.tracks = [];
  playlist.trackCount = 0;
  playlist.currentTrackIndex = 0;

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
    playlist.currentTrackImage = playlist.currentTrack.artwork_url;
    playlist.currentTrackImageLarge = playlist.currentTrack.artwork_url.replace('large', 't500x500');
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
      isPlaying = false;
      scPlayer.pause();
      self.isPlaying = false;
    } else {
      isPlaying = true;
      scPlayer.play( {playlistIndex: playlist.currentTrackIndex} );
      console.log(playlist.currentTrackIndex);
      // console.log(scPlayer.playing);
      self.isPlaying = true;
    }
    // console.log(self.title);

  };
  self.previous = function() {
    scPlayer.previous();

    if (playlist.currentTrackIndex > 0) {
      playlist.currentTrackIndex--;
      playlist.updateCurrentTrack();
      self.isPlaying = true;
      isPlaying = true;
    }

    console.log(playlist.currentTrackIndex);
  };
  self.next = function() {
    scPlayer.next();

    if (playlist.currentTrackIndex < playlist.trackCount - 1) {
      playlist.currentTrackIndex++;
      playlist.updateCurrentTrack();
      self.isPlaying = true;
      isPlaying = true;
    }

    console.log(playlist.currentTrackIndex);
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