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
  playlist.nowPlaying = 0;

  playlist.getPlaylist = function(audioURL) {
    scPlayer.resolve(audioURL, function (scPlaylist) {
      // do smth with array of `playlist.tracks` or playlist's metadata
      // e.g. display playlist info in a view etc.
      // scPlaylist = playlist;
      //
      // playlist = scPlaylist;
      playlist.tracks = scPlaylist.tracks;

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

  self.createPlayer = function() {

  };
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
    console.log(self.title);

  };
  self.previous = function() {
    scPlayer.previous();
  };
  self.next = function() {
    scPlayer.next();
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