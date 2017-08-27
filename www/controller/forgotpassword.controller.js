angular.module('forgotpassword.module.controller', []).controller('forgotpassword.controller', function ($scope, ionicToast, $state, httpServices, $ionicLoading, $ionicHistory) {
    $scope.submit = function () {

    }
    $scope.goBack = function () {
        $ionicHistory.goBack();
    }
})