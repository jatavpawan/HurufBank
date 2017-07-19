angular.module('Quran.Audio.module.controller', []).controller('Quran.Audio.controller',
    function ($scope, $stateParams, Chats) {
  
    $scope.settings = {
        enableFriends: true
    };
    $scope.CallAudio = function (src) {
        pauseAudio();
        playAudio(src);
    }
    var my_media = null;
    var mediaTimer = null;

    // Play audio
    //
    playAudio = function (src) {
        if (my_media == null) {
            // Create Media object from src
            my_media = new Media(src, onSuccess, onError);
        } // else play current audio
        // Play audio
        my_media.play();

        // Update my_media position every second
        if (mediaTimer == null) {
            mediaTimer = setInterval(function () {
                // get my_media position
                my_media.getCurrentPosition(
                    // success callback
                    function (position) {
                        if (position > -1) {
                            setAudioPosition((position) + " sec");
                            getAudioDurations();
                        }
                    },
                    // error callback
                    function (e) {
                        console.log("Error getting pos=" + e);
                        setAudioPosition("Error: " + e);
                    }
                );
            }, 1000);
        }
    }

    // Pause audio
    // 
    pauseAudio = function () {
        if (my_media) {
            my_media.pause();
        }
    }
    // Stop audio
    // 
    stopAudio = function () {
        if (my_media) {
            my_media.stop();
        }
        clearInterval(mediaTimer);
        mediaTimer = null;
    }

    // onSuccess Callback
    //
    onSuccess = function () {
        console.log("playAudio():Audio Success");
    }

    // onError Callback 
    //
    onError = function (error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }

    // Set audio position
    // 
    setAudioPosition = function (position) {
        $scope.setPos = position;
    }
    getAudioDurations = function () {
        var counter = 0;
        var timerDur = setInterval(function () {
            counter = counter + 100;
            if (counter > 2000) {
                clearInterval(timerDur);
            }
            var dur = my_media.getDuration();
            if (dur > 0) {
                clearInterval(timerDur);
                $scope.audio_duration = (dur) + " sec";
            }
        }, 100);
    }

})