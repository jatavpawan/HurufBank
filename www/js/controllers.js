angular.module('starter.controllers', [])
.controller('DashCtrl', function ($scope, pdfDelegate) {
    $scope.relativity = 'http://gmcsco.com/para.pdf';
    $scope.material = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/149125/material-design-2.pdf';

    $scope.pdfUrl = $scope.relativity;

})

.controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});


    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };

    $scope.CallVideo = function (vid) {
       // document.addEventListener("deviceready", function () {
           //window.youtube.init("AIzaSyCgv-dB__V8wvv7s0-c71dXIvdvq4kCbL4");
           //window.youtube.playVideo(vid);
      //  YoutubeVideoPlayer.openVideo(vid);
    //    VideoPlayer.play("https://www.youtube.com/watch?v=o06VNoOqzg8");
     
        window.InAppYouTube.openVideo('o06VNoOqzg8', {
            fullscreen: true
        }, function (result) {
            // console.log(JSON.stringify(result));
        }, function (reason) {
            alert(reason);
        });
      
    };


})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);



})

.controller('AccountCtrl', function ($scope) {
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



  playAudio=function (src) {
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
  pauseAudio= function () {
        if (my_media) {
            my_media.pause();
        }
    }

    // Stop audio
    // 
  stopAudio=  function () {
        if (my_media) {
            my_media.stop();
        }
        clearInterval(mediaTimer);
        mediaTimer = null;
    }

    // onSuccess Callback
    //
 onSuccess= function () {
        console.log("playAudio():Audio Success");
    }

    // onError Callback 
    //
   onError= function (error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }

    // Set audio position
    // 
  setAudioPosition= function (position) {
      $scope.setPos= position;
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
              $scope.audio_duration= (dur) + " sec";
          }
      }, 100);
  }


});
