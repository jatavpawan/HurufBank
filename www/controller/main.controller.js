angular.module('main.module.controller', []).controller('main', function ($scope, $rootScope, $state, httpServices, $ionicLoading, ionicToast, $rootScope) {
  
    $rootScope.loginStatus=false;
    $rootScope.footerIcoSelection = 1;
    $scope.SelectTab = function (tabId) {
      $rootScope.footerIcoSelection=tabId;
      if(tabId==5)
        {
          $state.go('myaccount')
        }
    }
    $state.go('login')
});