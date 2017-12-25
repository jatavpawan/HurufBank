angular.module('Quran.Video.module', []).controller('Quran.Video.Controller', function ($scope, $rootScope, $state, Chats, httpServices,ionicToast) {
    $scope.isShowAddIcon = false;
  if (localStorage.getItem("UserID") == 1) {
    $scope.isShowAddIcon = true;
  }
    $scope.Files = {};
    var queryStr = 'FileType=2&FileCategory=' + $rootScope.footerIcoSelection;
    httpServices.get('/GetFiles?' + queryStr).then(function (response) {
        // $scope.Files = ;
        angular.forEach(response.data, function (value, key) {
            $scope.Files[key] = value;
            $scope.Files[key].youtubeID = value.FileURL.split("?v=").pop();
        });
    }, function (error) {
    });
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
    $scope.AddFile = function () {
        $rootScope.TabID = "2";
        $rootScope.disableVideoUploadOption = true;
        $state.go("addfile");
    };
     $scope.DeleteFile = function (id) {
        var queryStr = 'id=' + id;
        httpServices.get('/DeleteFile?' + queryStr).then(function (res) {
            ionicToast.show(res.data, 'bottom', false, 2500);
            var qStr = 'FileType=2&FileCategory=' + $rootScope.footerIcoSelection;
            httpServices.get('/GetFiles?' + qStr).then(function (response) {
                $scope.Files = response.data;

            }, function (error) {
            });

        }, function (error) {
        });
    }
})