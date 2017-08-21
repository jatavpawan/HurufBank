﻿angular.module('login.module.controller', []).controller('login.controller', function ($scope, $state, httpServices, ionicToast, $rootScope, $ionicHistory,$timeout) {
    var count = 0;
      $timeout(function () {
          $ionicHistory.clearCache();
      }, 200) 
   
    $scope.passhow = false;
    $scope.authenticateUser = function (data) {
        if (count == 0) {
            $scope.passhow = true;
            count++;
        }
        else {
         
            httpServices.post('LoginUser', data).then(function (response) {
                if (response.data.Source != 0) {
                    ionicToast.show(response.data.Success, 'bottom', false, 2500);
               
                 //   alert(JSON.stringify(response));
                    $ionicHistory.clearHistory();
                    ionicToast.show(response.data.Success, 'bottom', false, 2500);
                    localStorage.setItem("UserID", response.data.Source);
                    localStorage.setItem("loginStatus", true);
                    httpServices.get('/GetUserInfo?UserID=' + response.data.Source).then(function (dat) {
                      //  alert(JSON.stringify(dat));
                       $rootScope.loginStatus=true;
                        $rootScope.profilePicture ="http://smartservicesapp.com/Uploads/profilepic/"+ dat.data[0].FilePathName;
                        $rootScope.profileName = "Hello! " + dat.data[0].FirstName;
                      //  alert("Hello! " + dat.data.GetUserInfoResult[0].FirstName)
                        $state.go('tab.dash');
                      // $urlRouterProvider.otherwise('main');
                    }, function (error) {

                    })
                   
                }
                else {
                    
                    
                }
            }, function (error) {
                ionicToast.show('Login failed', 'top', false, 2500);

            })

        }
    }
})