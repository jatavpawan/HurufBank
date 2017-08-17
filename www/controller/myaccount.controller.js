angular.module('myaccount.module.controller', []).controller('myaccount.controller', function ($scope, $state, $ionicPopover, httpServices, ionicToast, $rootScope, $ionicHistory,$ionicLoading) {
    $scope.dataSrc = "img/classprofile.png"
    $scope.data = {};
    $scope.dataSrc = 'http://websvc.smartservicesapp.com/Uploads/profilepic/';
    var userId = localStorage.getItem("UserID");
    httpServices.get('/GetUserInfo?UserID=' + userId).then(function (response) {
        if (response.data.length > 1)
        { $scope.data = response.data[0]; }
        else {
            $scope.data = response.data;
        }
        $scope.dataSrc += $scope.data.FilePathName;
    }, function (error) {
    });
    $scope.setProfilePicture = function () {
        $scope.popover.hide();
        navigator.camera.getPicture(profilePictureSuccess, profilePictureFail, {
            quality: 50,
            correctOrientation: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 2592,
            targeHeight: 4608,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
            mediaType: Camera.MediaType.PICTURE
        });

    }
    
    $scope.logout = function () {
        localStorage.setItem("UserID", null);
        localStorage.setItem('GCMID', null);
        $rootScope.loginStatus = false;
        $state.go('login');
    }

    $scope.takeFromCamera = function () {
        $scope.popover.hide();
        navigator.camera.getPicture(profilePictureSuccess, profilePictureFail, {
            quality: 50,
            correctOrientation: true,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.CAMERA,
        });
    }
    $scope.registerUser = function (data1) {
        var data = data1;
        data.GCMId = localStorage.getItem('GCMID');
        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {


            var fileURL = $scope.FileName;
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = fileURL.split("/").pop();
            options.mimeType = "text/plain";

            var params = {};
            if (!$scope.pass) {
                data.RegistrationID = localStorage.getItem('UserID');
            }
            params = data;

            options.params = params;
            var ft = new FileTransfer();
            $ionicLoading.show();
            if (fileURL == null || fileURL == "") {

            }
            console.log('updates come here');
            console.log($scope.FileName)
            if ($scope.FileName == '') {
                httpServices.post('RegisterUser', data).then(function (suc) {
                    ionicToast.show('Updated Successfully', 'bottom', false, 2500);
                    $state.go('tab.dash', null, { reload: true });
                }, function (er) {
                    ionicToast.show('error occured', 'bottom', false, 2500);
                })
            }
            else {

                ft.upload(fileURL, encodeURI("http://websvc.smartservicesapp.com/PicUpload.ashx"), function (r) {
                    alert(JSON.stringify(r));
                    if ($scope.pass) {
                        ionicToast.show('Registered Successfully', 'bottom', false, 2500);
                    } else {
                        ionicToast.show('Updated Details Successfully', 'bottom', false, 2500);
                    }
                    $rootScope.profilePicture = "data:image/jpeg;base64," + r.response;
                    $rootScope.loginStatus = true;
                    // alert(JSON.stringify(response));


                    $ionicLoading.hide();
                    $state.go('tab.dash', null, { reload: true });
                }, function (error) {
                    alert("An error has occurred: Code = " + error.code);
                    alert("upload error source " + error.source);
                    alert("upload error target " + error.target);
                }, options);
            }
        }


    }

    function profilePictureSuccess(imageUrl) {

        document.getElementById('camera').src = imageUrl;
        document.getElementById('camera').height = 180;
        document.getElementById('camera').width = 180;
        $scope.FileName = imageUrl;


    }
    function profilePictureFail(ex) {
        //  alert('failed called' + JSON.stringify(ex));
    }
    var template = '<ion-popover-view style="height:100px; width:90%"><ion-content class="ion-contentColor dark-border"><div class="row"><div class="col text-center" data-ng-click="takeFromCamera()"><img src="img/1469647735_camera.ico"  height="77px" width="77px"/></div><div class="col text-center" data-ng-click="setProfilePicture()"><img src="img/1469647872_image.ico"  height="77px" width="77px"/></div></div> </ion-content></ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.openPopover = function ($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
     $scope.changePassword = function (data) {
        
        if (data.reenterpassword.trim() != data.NewPassword.trim()) {

            var myPopup = $ionicPopup.confirm({
                template: 'New Password and Re entered password do not match.',
                title: 'Alert',

                // scope: $scope,

            });
            myPopup.then(function (res) {
                return;
            })
        }
        else {
            data.RegistrationID = localStorage.getItem('UserID');


        httpServices.post('ChangePassword ', data).then(function (response) {
            console.log(response);
            //$scope.myPosts = response.data.GetBlogListbyUserIDResult;
            // pagepost++;
            if (response.data.Success == 'Password has been changed successfully') {


                $ionicLoading.show({ template: response.data.Success });
                setTimeout(function () {
                    $ionicLoading.hide()
                    $state.go('dashboard');
                }, 3000)
            }
            else {
                if (response.data.Success != null || response.data.Success != 'null')
                {

                $ionicLoading.show({ template: response.data.Success });
                    setTimeout(function () {
                        $ionicLoading.hide()
                    }, 2000)
                }
                else {
                    $ionicLoading.show({ template: response.data.Success });
                    setTimeout(function () {
                        $ionicLoading.hide()
                    }, 2000)
                }
            }
           
             
                
          
        }, function (error) {

        });
        }
    }
});