angular.module('addfile.module.controller', []).controller('addfile.controller', function ($scope, $state, httpServices, ionicToast, $rootScope, $ionicHistory) {

$scope.choice='A';
$scope.goBack=function()
{
    $ionicHistory.goBack();
}
});