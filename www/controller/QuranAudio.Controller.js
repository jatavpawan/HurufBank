angular.module('Quran.Audio.module', []).controller('Quran.Audio.Controller', function ($scope, $rootScope, $state, $ionicPlatform,
   $cordovaFileTransfer, httpServices, $timeout, $cordovaMedia, ngProgressFactory, ionicToast) {
  var media = null, totalDuration = 0;
  $scope.progressbar = ngProgressFactory.createInstance();
  $scope.isShowAddIcon = false;
  if (localStorage.getItem("UserID") == 1) {
    $scope.isShowAddIcon = true;
  }
  $scope.Files = {};
  $scope.pause = true;
  var queryStr = 'FileType=3&FileCategory=' + $rootScope.footerIcoSelection;
  httpServices.get('/GetFiles?' + queryStr).then(function (response) {
    $scope.Files = response.data;

  }, function (error) {
  });

  $scope.player = {
    key: '' // Holds a last active track
  }
  $scope.downloadSong = function (audio) {
    audio.IsDownloaded = true;
    $ionicPlatform.ready(function () {
       $scope.progressbar.setParent(document.getElementById(audio.AppFileID));
      $scope.progressbar.setColor('#215dce');
      $scope.progressbar.set(5);
      var url = audio.FileURL;
      var filename = url.split("/").pop();
      //alert(filename);
      var targetPath = cordova.file.cacheDirectory + "/" + filename;
      var options = {};
      var download = $cordovaFileTransfer.download(url, targetPath, options, true).then(function (success) {
        $scope.downloadProgress = 100;
        $scope.progressbar.set($scope.downloadProgress);
        console.log("success " + JSON.stringify(success));
        $timeout(function () {
          audio.IsDownloaded = true;
          $scope.SetFileIsDownloaded(audio.IsDownloaded, audio.AppFileID);
          ionicToast.show('File downloaded successfully...', 'bottom', false, 2500);
          $scope.progressbar.reset();
        }, 1000);

      }, function (error) {
        console.log("Error " + JSON.stringify(error));
      }, function (progress) {
        $scope.downloadProgress = (progress.loaded / progress.total) * 100;
        $scope.progressbar.set($scope.downloadProgress);
      });


      if ($scope.downloadProgress > 0.1) {
        download.abort();
      }
    });
  }

  $scope.playTrack = function (audio) {

    if (angular.isUndefined(audio.pause)) {
      $scope.progressbar.setParent(document.getElementById(audio.AppFileID));
      $scope.progressbar.setColor('#6f1f1f');
      var filename = audio.FileURL.split("/").pop();

      var targetPath = cordova.file.cacheDirectory + "/" + filename;
      //alert(targetPath);
      media = $cordovaMedia.newMedia(targetPath);
      // var iOSPlayOptions = {
      //   numberOfLoops: 2,
      //   playAudioWhenScreenIsLocked: false
      // }

      //media.play(iOSPlayOptions); // iOS only!
      $scope.PlayMedia(audio);
      media.play(); // Android
      console.log(media.getDuration());

      audio.pause = false;

    }

    if (audio.pause) {
      media.pause();
    }
    else {
      $scope.PlayMedia(audio);
    }
    audio.pause = !audio.pause;
  };

  $scope.PlayMedia = function (audio) {
    media.play().then(function () {
      // success
      //Perform some action when playback finishes like playNext()
      console.log("fire when playback finishes");
      $timeout(function () {
        media.stop();
        media.release();
        media = null;
        audio.pause = undefined;
        $scope.progressbar.reset();
      });
    }, function (error) {
      if (error.code == 1) {
        $timeout(function () {
          ionicToast.show('File Not Found....Download again', 'bottom', false, 2500);
          audio.pause = undefined;
          $scope.progressbar.reset();
          audio.IsDownloaded = false;
          $scope.SetFileIsDownloaded(audio.IsDownloaded, audio.AppFileID);
          media.stop();
          media.release();
          media = null;
        });
      }
    }, function (data) {

      if (data.status) {
        //Watch for status changes from the Media plugin, perform some action on start, stop, pause etc
        //Media.MEDIA_NONE = 0;
        //Media.MEDIA_STARTING = 1;
        //Media.MEDIA_RUNNING = 2;
        //Media.MEDIA_PAUSED = 3;
        //Media.MEDIA_STOPPED = 4;
        console.log(data.status);
      };

      if (data.duration) {
        totalDuration = data.duration;

      };

      if (data.position) {
        //Update the current playback position every second
        console.log('track progress: ' + data.position);
        $timeout(function () {
          var percent = (data.position / totalDuration) * 100;
          $scope.progressbar.set(percent);
        });
      };

    });
  };
  $scope.stopTrack = function (audio) {
    media.stop();
    media.release();
    media = null;
    audio.pause = undefined;
    $scope.progressbar.reset();
  };
  $scope.AddFile = function () {
    $rootScope.TabID = "3";
    $rootScope.disableVideoUploadOption = false;
    $state.go("addfile");
  };
  $scope.$on('$destroy', function () {
    // clean up stuff
    if (media != null) {
      media.stop();
      media.release();
      media = null;
      $scope.progressbar.reset();
    }
  })
  $scope.SetFileIsDownloaded = function (IsDownloaded, AppFileID) {
    var queryStr = 'flag=' + IsDownloaded + '&appFileId=' + AppFileID;
    httpServices.get('/SetFileIsDownloaded?' + queryStr).then(function (response) {
      //response.data;

    }, function (error) {
    });
  }
});
