angular.module('Quran.Video.module.controller', []).controller('Quran.Video.controller', function ($scope, Chats) {
  
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };

    $scope.CallVideo = function (vid) {      
        window.InAppYouTube.openVideo('o06VNoOqzg8', {
            fullscreen: true
        }, function (result) {
            // console.log(JSON.stringify(result));
        }, function (reason) {
            alert(reason);
        });

    };
})