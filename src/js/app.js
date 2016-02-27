(function () {
   'use strict';
   // this function is strict...
    var CLIENT_ID = 'bc2740865fc8d120b6df98beae813823';

    var audioURL = 'http://soundcloud.com/jxnblk/sets/yello';

    var $audioURLInput, $audioURLSubmit;

    var $player, $playerPlay, $playerPrevious, $playerNext;
    var isPlaying = false;

    var scPlayer = new SoundCloudAudio(CLIENT_ID);

    document.addEventListener('DOMContentLoaded', function () {
        $player = document.getElementById('player');
        $playerPlay = document.getElementById('player-play');
        $playerPrevious = document.getElementById('player-previous');
        $playerNext = document.getElementById('player-next');

        $audioURLInput = document.getElementById("audioURL-input");
        $audioURLSubmit = document.getElementById("audioURL-submit");

        $audioURLInput.addEventListener('keydown', function() {
            if (event.keyCode == 13) {
                audioURL = $audioURLInput.value;
                createPlayer();
            }
        });
        // submit audio URL
        $audioURLSubmit.addEventListener('click', function() {
            // trackURL = $soundcloudURL.value;
            audioURL = $audioURLInput.value;
            createPlayer();
        });

        // play/pause
        $playerPlay.addEventListener('click', function() {
            if (isPlaying) {
                isPlaying = false;
                scPlayer.pause();
            } else {
                isPlaying = true;
                scPlayer.play();
            }
        });

        // next
        $playerNext.addEventListener('click', function() {
            scPlayer.next();
        });

        // previous
        $playerPrevious.addEventListener('click', function() {
            scPlayer.previous();
        });

        createPlayer();

    });

    function createPlayer() {
        scPlayer.stop();
        scPlayer = new SoundCloudAudio(CLIENT_ID);

        // OR to load PLAYLIST and resolve it's data
        scPlayer.resolve(audioURL, function (err, playlist) {
            // do smth with array of `playlist.tracks` or playlist's metadata
            // e.g. display playlist info in a view etc.
            console.log(playlist);

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
}());