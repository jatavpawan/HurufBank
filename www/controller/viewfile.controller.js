angular.module('viewfile.module.controller', []).controller('viewfile.controller', function ($scope, $rootScope, $ionicHistory, pdfDelegate, $stateParams) {
    $rootScope.loginStatus = false;
    $scope.relativity = $stateParams.fileURL;//'http://gmcsco.com/para.pdf';
    $scope.material = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/149125/material-design-2.pdf';
    $scope.pdfUrl = $scope.relativity;
    $scope.goBack = function () {
        $rootScope.loginStatus = true;
        $ionicHistory.goBack();

    }
});