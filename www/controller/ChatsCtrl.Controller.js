angular.module('Quran.Video.module', [])

.controller('Quran.Video.Controller', function ($scope, Chats) {

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