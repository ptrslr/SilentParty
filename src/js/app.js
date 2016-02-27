(function () {
   'use strict';
   // this function is strict...
    var CLIENT_ID = 'bc2740865fc8d120b6df98beae813823';

    var trackURL = 'https://soundcloud.com/kaytranada/drive-me-crazy-featuring-vic-mensa';
    var track, trackURI;

    var audioURL = 'http://soundcloud.com/jxnblk/sets/yello';

    var $audioURLInput, $audioURLSubmit;

    var $player, $playerPlay, $playerPrevious, $playerNext;
    var isPlaying = false;

    var scPlayer;

    // Add an event listener of DOMContentLoaded to the whole document and call an anonymous function.
    // You can then wrap your code in that function's brackets
    // and it will execute once loading is complete.

    document.addEventListener('DOMContentLoaded', function () {
        $player = document.getElementById('player');
        $playerPlay = document.getElementById('player-play');
        $playerPrevious = document.getElementById('player-previous');
        $playerNext = document.getElementById('player-next');

        $audioURLInput = document.getElementById("audioURL-input");
        $audioURLSubmit = document.getElementById("audioURL-submit");

        $audioURLSubmit.addEventListener('click', function() {
            // trackURL = $soundcloudURL.value;
            audioURL = $audioURLInput.value;
            createPlayer();
        });

        createPlayer();

    });

    function createPlayer() {
        scPlayer = new SoundCloudAudio(CLIENT_ID);
        // OR to load PLAYLIST and resolve it's data
        scPlayer.resolve(audioURL, function (err, playlist) {
            // do smth with array of `playlist.tracks` or playlist's metadata
            // e.g. display playlist info in a view etc.
            console.log(playlist);

            // once playlist is loaded it can be played
            scPlayer.play();

            // for playlists it's possible to switch to another track in queue
            // e.g. we do it here when playing track is finished
            scPlayer.on('ended', function () {
                scPlayer.next();
            });
        });
    }
}());