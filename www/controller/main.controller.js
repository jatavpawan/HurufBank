﻿angular.module('main.module.controller', []).controller('main', function ($scope, $rootScope, $state, httpServices, $ionicLoading, ionicToast, $rootScope) {
  
    $rootScope.loginStatus=false;
    $rootScope.footerIcoSelection = 1;
    $scope.SelectTab = function (tabId) {
      $rootScope.footerIcoSelection=tabId;
      // if(tabId==5)
      //   {
      //     $state.go('myaccount')
      //   }
    }
   
    var UIDs = localStorage.getItem("UserID");
    console.log(UIDs);
    if (UIDs == "null") {
        $state.go('login');
        $rootScope.loginStatus=false;
    }
    else { $state.go('tab.dash'); $rootScope.loginStatus=true;}
});