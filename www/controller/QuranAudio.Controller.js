angular.module('Quran.Audio.module', []).controller('Quran.Audio.Controller', function ($scope, $ionicPlatform, $cordovaFileTransfer) {
  
  var audio = [{
    id: 1,
    key: 'master',
    title: "The Master",
    track: 'https://royalwap.net/128-4878/Mera%20Dil%20Bhi%20Kitna%20Pagal%20Hai.mp3',
    genre: "This will be card Description",
    download:true
  }, {
    id: 2,
    key: 'give',
    title: "Give",
    track: 'https://royalwap.net/128-789319s/Main%20Tera%20Boyfriend.mp3',
    genre: "Alternative & Punk | Bright",
    download:true
  }, {
    id: 3,
    key: 'morning',
    title: "Morning Stroll",
    track: 'https://royalwap.net/128-389689/Lag%20Ja%20Gale%20Ke%20Phir.mp3',
    genre: "Classical | Happy",
    download:false
  },];

  $scope.audioTracks = Array.prototype.slice.call(audio, 0);

  $scope.player = {
    key: '' // Holds a last active track
  }
  $scope.downloadSong = function (track) {
    $ionicPlatform.ready(function () {

      var url = track;
      var filename = url.split("/").pop();
      alert(filename);
      var targetPath = cordova.file.externalRootDirectory+"Huruf/Audio/" + filename;
      var trustHosts = true
      var options = {};
      alert(cordova.file.externalRootDirectory);
      $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
        .then(function (result) {
          // Success!
          alert("Success"+JSON.stringify(result));
        }, function (error) {
          // Error
          alert("Error"+JSON.stringify(error));
        }, function (progress) {
          $timeout(function () {
            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
          })
        });
    });
  }

  $scope.playTrack = function (track, key) {
    var filename = track.split("/").pop();
    
      var targetPath = cordova.file.externalRootDirectory+"Huruf/Audio/" + filename;
        alert(targetPath);
    // Preload an audio track before we play it
    // window.plugins.NativeAudio.preloadComplex(key, targetPath, 1, 1, 0, function(msg) {
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
   // var audioUrl = track;

    // // Play an audio file (not recommended, since the screen will be plain black)
    // window.plugins.streamingMedia.playAudio(track);

    // Play an audio file with options (all options optional)
    var options = {
      bgColor: "#FFFFFF",
      //bgImage: "<SWEET_BACKGROUND_IMAGE>",
      bgImageScale: "fit", // other valid values: "stretch"
      initFullscreen: false, // true(default)/false iOS only
      successCallback: function () {
        console.log("Player closed without error.");
      },
      errorCallback: function (errMsg) {
        console.log("Error! " + errMsg);
      }
    };
    window.plugins.streamingMedia.playAudio(targetPath, options);
  };

  $scope.stopTrack = function () {
    // If this is not a first playback stop and unload previous audio track
    if ($scope.player.key.length > 0) {
      window.plugins.NativeAudio.stop($scope.player.key); // Stop audio track
      window.plugins.NativeAudio.unload($scope.player.key); // Unload audio track
      $scope.player.key = ''; // Remove a current track on unload, it will break an app if we try to unload it again in playTrack function
    }
  };
});
