angular.module('Quran.Video.module', [])

.controller('Quran.Video.Controller', function ($scope,$rootScope,$state, Chats) {

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };

    $scope.CallVideo = function (vid) {
      
        window.InAppYouTube.openVideo(vid, {
            fullscreen: true
        }, function (result) {
        
        }, function (reason) {
            alert(reason);
        });

    };
     $scope.AddFile=function(){ 
      $rootScope.TabText="Video";
     $state.go("addfile");
    };
})