angular.module('addpost.module.controller', []).controller('addpost.controller', function ($scope, $rootScope, ionicToast, $state, httpServices, $ionicLoading, $ionicHistory, $location) {
    $scope.goBack = function () {
        $rootScope.loginStatus = true;
        $ionicHistory.goBack();

    }
    $scope.Post = function (data) {
        $ionicLoading.show();
        data.PostedBy = localStorage.getItem("UserID");
        data.PostedDate = new Date().toISOString();
        httpServices.post('SaveDiscussion', data).then(function (response) {
            ionicToast.show(response.data.Success, 'bottom', false, 2500);
            $rootScope.lsoginStatus = true;
            $ionicLoading.hide();
            $ionicHistory.goBack();
        }, function (er) {
            $ionicLoading.hide();
            ionicToast.show('error occured', 'bottom', false, 2500);
        })
    }
});