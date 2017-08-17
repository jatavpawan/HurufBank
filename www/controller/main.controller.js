angular.module('main.module.controller', []).controller('main', function ($scope,$location, $rootScope, $state, httpServices, $ionicLoading, ionicToast, $rootScope) {

    $rootScope.loginStatus = false;
    $rootScope.footerIcoSelection = 1;
    $scope.SelectTab = function (tabId) {
        $rootScope.footerIcoSelection = tabId;
        // if(tabId==5)
        //   {
        //     $state.go('myaccount')
        //   }
    }

    var UIDs = localStorage.getItem("UserID");
    console.log(UIDs);
    if (UIDs == null || UIDs == "null") {
        $rootScope.loginStatus = false;
        // $state.go('login');
      $location.path('/login');
    }
    else { $rootScope.loginStatus = true;
        //  $state.go('tab.dash'); 
         $location.path('/tab/dash');
    }
});