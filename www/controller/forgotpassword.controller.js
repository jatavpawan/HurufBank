angular.module('forgotpassword.module.controller', []).controller('forgotpassword.controller', function ($scope, ionicToast, $state, httpServices, $ionicLoading, $ionicHistory) {
    $scope.submit = function (data) {

        if (!angular.isUndefined(data.email) || data.email != '') {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var valid = re.test(data.email);

            if (valid) {
                var queryStr = 'email=' +data.email;
                    httpServices.get('/GetForgotPassword?' + queryStr).then(function (response) {
                        //response.data;
 ionicToast.show(response.data, 'bottom', false, 2500);
                    }, function (error) {
                    });
            }
            else {
                ionicToast.show('Please enter valid email', 'bottom', false, 2500);
            }
        }
        else {
            ionicToast.show('Please enter email', 'bottom', false, 2500);
        }
    }
    $scope.goBack = function () {
        $ionicHistory.goBack();
    }
})