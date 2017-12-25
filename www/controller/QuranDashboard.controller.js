angular.module('Quran.pdf.Module', []).controller('Quran.pdf.Controller', function ($scope, $rootScope, pdfDelegate, $state, httpServices, ionicToast) {
    $scope.isShowAddIcon = false;
    if (localStorage.getItem("UserID") == 1) {
        $scope.isShowAddIcon = true;
    }
    $scope.showDelegate = false;
    $scope.Files = {};
    var queryStr = 'FileType=1&FileCategory=' + $rootScope.footerIcoSelection;
    httpServices.get('/GetFiles?' + queryStr).then(function (response) {
        $scope.Files = response.data;

    }, function (error) {
    });

    $scope.OpenPDF = function (fileURL) {
        $state.go('viewfile', { fileURL: fileURL });
    };

    $scope.AddFile = function () {
        $rootScope.TabID = "1";
        $rootScope.disableVideoUploadOption = false;
        $state.go("addfile");
    };
    $scope.DeleteFile = function (id) {
        var queryStr = 'id=' + id;
        httpServices.get('/DeleteFile?' + queryStr).then(function (res) {
            ionicToast.show(res, 'bottom', false, 2500);
            var queryStr = 'FileType=1&FileCategory=' + $rootScope.footerIcoSelection;
            httpServices.get('/GetFiles?' + queryStr).then(function (response) {
                $scope.Files = response.data;

            }, function (error) {
            });

        }, function (error) {
        });
    }
})