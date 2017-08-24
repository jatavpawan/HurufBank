angular.module('addfile.module.controller', []).controller('addfile.controller', function ($scope, $state, httpServices, ionicToast, $rootScope, $ionicHistory, $location,$ionicLoading) {
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
    $scope.SaveFile = function (data) {
        $ionicLoading.show();
        data.FileType = $rootScope.TabID;
        data.FileCategory = $rootScope.footerIcoSelection;
        data.CreatedBy = localStorage.getItem("UserID");
        
        if ($scope.link) {
            httpServices.post('SaveUserFile', data).then(function (response) {
                ionicToast.show(response.data.Success, 'bottom', false, 2500);
                $rootScope.loginStatus = true;

                $ionicLoading.hide();
                //$state.go('myaccount', null, { reload: true });
                 $ionicHistory.goBack();
            }, function (er) {
                  $ionicLoading.hide();
                ionicToast.show('error occured', 'bottom', false, 2500);
            })
        }
        else {

        }
    }
});