var CLIENT_ID = 'bc2740865fc8d120b6df98beae813823',
    audioURL = 'http://soundcloud.com/jxnblk/sets/yello',
    isPlaying = false,
    scPlayer = new SoundCloudAudio(CLIENT_ID);

function createPlayer() {
  scPlayer.stop();
  scPlayer = new SoundCloudAudio(CLIENT_ID);

  // OR to load PLAYLIST and resolve it's data
  scPlayer.resolve(audioURL, function (err, playlist) {
    // do smth with array of `playlist.tracks` or playlist's metadata
    // e.g. display playlist info in a view etc.
    // console.log(playlist);

    // once playlist is loaded it can be played
    if (isPlaying) {
      scPlayer.play();
    }

    // for playlists it's possible to switch to another track in queue
    // e.g. we do it here when playing track is finished
    scPlayer.on('ended', function () {
      scPlayer.next();
    });
  });
}

createPlayer();

var myApp = angular.module('silentParty', []);

// http://stackoverflow.com/questions/17470790/how-to-use-a-keypress-event-in-angularjs
myApp.directive('myEnter', function () {
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

myApp.controller('AudioSubmitController', function() {
  var self = this;

  self.submit = function() {
    audioURL = self.audioURL;
    createPlayer();
  };
  self.keydown = function() {

  };
});

myApp.controller('PlayerController', function() {
  var self = this;

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
      self.playPauseLabel = "Pause";
    }

  };
  self.previous = function() {
    scPlayer.previous();
  };
  self.next = function() {
    scPlayer.next();
  };
});