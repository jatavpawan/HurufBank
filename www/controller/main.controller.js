angular.module('main.module.controller', []).controller('main', function ($scope, $stateParams, $location, $rootScope, $state, httpServices, $ionicLoading, ionicToast, $rootScope) {

    $rootScope.loginStatus = false;
    $rootScope.footerIcoSelection = 1;
    $scope.SelectTab = function (tabId) {
        $rootScope.footerIcoSelection = tabId;
        console.log($stateParams)
        if ($stateParams.tabid == 1) {
            $state.go('tab.dash', { tabid: $stateParams.tabid }, { reload: true });
        }
        else if ($stateParams.tabid == 2) {
            $state.go('tab.chats', { tabid: $stateParams.tabid }, { reload: true });
        }
        else if ($stateParams.tabid == 3) {
            $state.go('tab.account', { tabid: $stateParams.tabid }, { reload: true });
        }

    }

    var UIDs = localStorage.getItem("UserID");
    console.log(UIDs);
    if (UIDs == null || UIDs == "null") {
        $rootScope.loginStatus = false;
        // $state.go('login');
        $location.path('/login');
    }
    else {
        $rootScope.loginStatus = true;
        //  $state.go('tab.dash'); 
        $location.path('/tab/dash/1');
    }
});