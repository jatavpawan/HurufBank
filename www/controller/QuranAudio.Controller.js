angular.module('Quran.Audio.module', [])

 

.controller('Quran.Audio.Controller', function ($scope, $ionicPlatform) {
    // $scope.settings = {
    //     enableFriends: true
    // };
    // $scope.CallAudio = function (src) {
    //     pauseAudio();
    //     playAudio(src);
    // }
    // var my_media = null;
    // var mediaTimer = null;

    // // Play audio
    // //



    // playAudio = function (src) {
    //     if (my_media == null) {
    //         // Create Media object from src
    //         my_media = new Media(src, onSuccess, onError);
    //     } // else play current audio
    //     // Play audio
    //     my_media.play();

    //     // Update my_media position every second
    //     if (mediaTimer == null) {
    //         mediaTimer = setInterval(function () {
    //             // get my_media position
    //             my_media.getCurrentPosition(
    //                 // success callback
    //                 function (position) {
    //                     if (position > -1) {
    //                         setAudioPosition((position) + " sec");
    //                         getAudioDurations();
    //                     }
    //                 },
    //                 // error callback
    //                 function (e) {
    //                     console.log("Error getting pos=" + e);
    //                     setAudioPosition("Error: " + e);
    //                 }
    //             );
    //         }, 1000);
    //     }
    // }

    // // Pause audio
    // // 
    // pauseAudio = function () {
    //     if (my_media) {
    //         my_media.pause();
    //     }
    // }

    // // Stop audio
    // // 
    // stopAudio = function () {
    //     if (my_media) {
    //         my_media.stop();
    //     }
    //     clearInterval(mediaTimer);
    //     mediaTimer = null;
    // }

    // // onSuccess Callback
    // //
    // onSuccess = function () {
    //     console.log("playAudio():Audio Success");
    // }

    // // onError Callback 
    // //
    // onError = function (error) {
    //     alert('code: ' + error.code + '\n' +
    //           'message: ' + error.message + '\n');
    // }

    // // Set audio position
    // // 
    // setAudioPosition = function (position) {
    //     $scope.setPos = position;
    // }
    // getAudioDurations = function () {
    //     var counter = 0;
    //     var timerDur = setInterval(function () {
    //         counter = counter + 100;
    //         if (counter > 2000) {
    //             clearInterval(timerDur);
    //         }
    //         var dur = my_media.getDuration();
    //         if (dur > 0) {
    //             clearInterval(timerDur);
    //             $scope.audio_duration = (dur) + " sec";
    //         }
    //     }, 100);
    // }
var audio = [{
    id: 1,
    key: 'master',
    title: "The Master",
    track: 'https://royalwap.net/128-4878/Mera%20Dil%20Bhi%20Kitna%20Pagal%20Hai.mp3',
    genre: "This will be card Description"
  }, {
    id: 2,
    key: 'give',
    title: "Give",
    track: 'https://royalwap.net/128-789319s/Main%20Tera%20Boyfriend.mp3',
    genre: "Alternative & Punk | Bright"
  }, {
    id: 3,
    key: 'morning',
    title: "Morning Stroll",
    track: 'https://royalwap.net/128-389689/Lag%20Ja%20Gale%20Ke%20Phir.mp3',
    genre: "Classical | Happy"
  }, ];
 
  $scope.audioTracks = Array.prototype.slice.call(audio, 0);
 
  $scope.player = {
    key: '' // Holds a last active track
  }
 
  $ionicPlatform.ready(function() {
 
    $scope.playTrack = function(track, key) {
      // // Preload an audio track before we play it
      // window.plugins.NativeAudio.preloadComplex(key, track, 1, 1, 0, function(msg) {
      //   // If this is not a first playback stop and unload previous audio track
      //   if ($scope.player.key.length > 0) {
      //     window.plugins.NativeAudio.stop($scope.player.key); // Stop audio track
      //     window.plugins.NativeAudio.unload($scope.player.key); // Unload audio track
      //   }
 
      //   window.plugins.NativeAudio.play(key); // Play audio track
      //   $scope.player.key = key; // Set a current audio track so we can close it if needed 
      // }, function(msg) {
      //   console.log('error: ' + msg); // Loading error
      // });
       //var audioUrl = track;

  // Play an audio file (not recommended, since the screen will be plain black)
  window.plugins.streamingMedia.playAudio(track);

  // Play an audio file with options (all options optional)
  var options = {
    bgColor: "#FFFFFF",
    //bgImage: "<SWEET_BACKGROUND_IMAGE>",
    bgImageScale: "fit", // other valid values: "stretch"
    initFullscreen: false, // true(default)/false iOS only
    successCallback: function() {
      console.log("Player closed without error.");
    },
    errorCallback: function(errMsg) {
      console.log("Error! " + errMsg);
    }
  };
  window.plugins.streamingMedia.playAudio(audioUrl, options);
    };
 
    $scope.stopTrack = function() {
        // If this is not a first playback stop and unload previous audio track
        if ($scope.player.key.length > 0) {
          window.plugins.NativeAudio.stop($scope.player.key); // Stop audio track
          window.plugins.NativeAudio.unload($scope.player.key); // Unload audio track
          $scope.player.key = ''; // Remove a current track on unload, it will break an app if we try to unload it again in playTrack function
        }
    };});
});
