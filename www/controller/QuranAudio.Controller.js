angular.module('Quran.Audio.module', []).controller('Quran.Audio.Controller', function ($scope, $rootScope, $state, $ionicPlatform, $cordovaFileTransfer, httpServices, $timeout, $cordovaMedia) {
  var media = '';

  $scope.Files = {};
  $scope.pause=true;
  var queryStr = 'FileType=3&FileCategory=' + $rootScope.footerIcoSelection;
  httpServices.get('/GetFiles?' + queryStr).then(function (response) {
    $scope.Files = response.data;

  }, function (error) {
  });

  $scope.player = {
    key: '' // Holds a last active track
  }
  $scope.downloadSong = function (track) {
    $ionicPlatform.ready(function () {

      var url = track;
      var filename = url.split("/").pop();
      alert(filename);
      var targetPath = cordova.file.externalRootDirectory + "Huruf/Audio/" + filename;
      var trustHosts = true
      var options = {};
      alert(cordova.file.externalRootDirectory);
      $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
        .then(function (result) {
          // Success!
          alert("Success" + JSON.stringify(result));
        }, function (error) {
          // Error
          alert("Error" + JSON.stringify(error));
        }, function (progress) {
          $timeout(function () {
            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
          })
        });
    });
  }

  $scope.playTrack = function (track, key) {
    if (media != '') {
      var filename = track.split("/").pop();

      var targetPath = cordova.file.externalRootDirectory + "Huruf/Audio/1.mp3";// + filename;
      alert(targetPath);
      media = $cordovaMedia.newMedia(targetPath);
      // var iOSPlayOptions = {
      //   numberOfLoops: 2,
      //   playAudioWhenScreenIsLocked: false
      // }

      //media.play(iOSPlayOptions); // iOS only!
      media.play(); // Android
      console.log(media.getDuration());
    }
    else {
      media.play();
    }
    $scope.pause=false;
  };
  $scope.pauseTrack = function () {
    media.pause();
    $scope.pause=true;
  };
  $scope.stopTrack = function () {
    media.stop();
    media.release();
  };
  $scope.AddFile = function () {
    $rootScope.TabID = "3";
    $state.go("addfile");
  };
});
