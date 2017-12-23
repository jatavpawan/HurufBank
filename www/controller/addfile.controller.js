angular.module('addfile.module.controller', []).controller('addfile.controller', function ($scope, $state, httpServices, ionicToast, $rootScope, $ionicHistory, $location, $ionicLoading, $timeout) {
    $rootScope.loginStatus = false;
    $scope.FileName = '';
    $scope.link = false;
    $scope.upload = false;
    $scope.uploadactive = '';
    $scope.uploadText = 'Select a ' + ($rootScope.TabID == 1 ? 'PDF' : $rootScope.TabID == 2 ? 'Video' : 'Audio') + ' file from device';
    $scope.clsactive1 = "button-outline";
    $scope.clsactive2 = "button-outline";

    $scope.goBack = function () {
        $rootScope.loginStatus = true;
        //$location.path('/tab/dash/1');
        $ionicHistory.goBack();

    }

    $scope.showHideLink = function () {
        $scope.link = true;
        $scope.upload = false;
        $scope.clsactive1 = "button-outline";
        $scope.clsactive2 = "";
    }
    $scope.uploadFile = function () {
        $scope.upload = true;
        $scope.link = false;
        $scope.clsactive1 = "";
        $scope.clsactive2 = "button-outline";

    }

    $scope.selectFile = function () {
        navigator.camera.getPicture(profilePictureSuccess, profilePictureFail, {
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
            mediaType: Camera.MediaType.ALLMEDIA
        });
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
                $ionicHistory.goBack();
            }, function (er) {
                $ionicLoading.hide();
                ionicToast.show('error occured', 'bottom', false, 2500);
            })
        }
        else if ($scope.upload) {
            if ($scope.FileName != '') {
                document.addEventListener("deviceready", onDeviceReady, false);
                function onDeviceReady() {
                    var fileURL = $scope.FileName;
                    var options = new FileUploadOptions();
                    options.fileKey = "file";
                    options.fileName = fileURL.split("/").pop();
                    options.mimeType = "text/plain";

                    var params = {};
                    params = data;

                    options.params = params;
                    var ft = new FileTransfer();
                    // ft.onprogress = function (progressEvent) {
                    //     if (progressEvent.lengthComputable) {
                    //         $timeout(function () {
                    //             $scope.downloadProgress = (progressEvent.loaded / progressEvent.total) * 100;
                    //         });
                    //     }
                    // };
                    ft.upload(fileURL, encodeURI("http://hurufwebsvc.gmcsco.com/FileUpload.ashx"), function (r) {
                        $ionicLoading.hide();
                        ionicToast.show(r.response, 'bottom', false, 3000);
                        $rootScope.loginStatus = true;
                        $ionicHistory.goBack();
                    }, function (error) {
                        alert("An error has occurred: Code = " + error.code);
                        alert("upload error source " + error.source);
                        alert("upload error target " + error.target);
                    }, options);
                }
            }
            else {
                $ionicLoading.hide();
                ionicToast.show('Please upload file', 'bottom', false, 5000);
            }
        }
        else {
            $ionicLoading.hide();
            ionicToast.show('please choose upload or link option', 'bottom', false, 5000);
        }
    }

    function profilePictureSuccess(imageUrl) {
        $scope.FileName = imageUrl;
        $timeout(function () {
            $scope.uploadText = imageUrl.split("/").pop();
            $scope.uploadactive = 'active';
        });
    }
    function profilePictureFail(ex) {
        alert('Try Again...');
    }
});