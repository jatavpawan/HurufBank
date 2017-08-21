angular.module('addfile.module.controller', []).controller('addfile.controller', function ($scope, $state, httpServices, ionicToast, $rootScope, $ionicHistory, $location) {
    $rootScope.loginStatus = false;
    $scope.link = false;
    $scope.goBack = function () {
        $rootScope.loginStatus = true;
        //$location.path('/tab/dash/1');
        $ionicHistory.goBack();

    }

    $scope.showHideLink = function () {
        $scope.link = !$scope.link
    }
});