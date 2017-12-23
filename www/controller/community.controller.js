angular.module('community.module.controller', []).controller('community.controller', function ($scope, $location, $timeout, $state, $ionicPopover, httpServices, ionicToast, $rootScope, $ionicHistory, $ionicLoading, $ionicPopup) {
    $rootScope.loginStatus = false;
    httpServices.get('/GetDiscussions').then(function (response) {
    $scope.Posts = response.data;

  }, function (error) {
  });
    $scope.goBack = function () {
        $rootScope.loginStatus = true;
        $rootScope.footerIcoSelection = 1;
           $location.path('/tab/dash/1');

    };

    $scope.AddFile = function () {
        $state.go("addpost");
    };
    $scope.ViewDiscussion=function(data)
    {
        $state.go("viewpost",{postData:data});
    }
});









 

