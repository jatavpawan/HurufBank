// angular.module('viewfile.module.controller', []).controller('viewfile.controller', function ($scope, $rootScope, $ionicHistory, pdfDelegate, $stateParams,$timeout) {

//     $rootScope.loginStatus = false;
//     $scope.relativity = $stateParams.fileURL;//'http://gmcsco.com/para.pdf';
//     $scope.material = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/149125/material-design-2.pdf';
//     $scope.pdfUrl = $scope.relativity;

//     $scope.goBack = function () {
//         $rootScope.loginStatus = true;
//         $ionicHistory.goBack();

//     }
// });

// var app = angular.module('viewfile.module.controller', ['ngPDFViewer']);

// app.controller('viewfile.controller', ['$scope', '$rootScope', '$ionicHistory', '$stateParams', '$timeout', 'PDFViewerService', '$sce','$ionicPlatform','$cordovaMedia',' $cordovaFileTransfer',
//     function ($scope, $rootScope, $ionicHistory, $stateParams, $timeout, pdf, $sce, $ionicPlatform,$cordovaMedia, $cordovaFileTransfer) {

angular.module('viewfile.module.controller', []).controller('viewfile.controller', function ($scope, $rootScope, $state, $ionicPlatform, PDFViewerService,
    $cordovaFileTransfer, httpServices, $timeout, $stateParams, $cordovaMedia, ngProgressFactory, ionicToast) {

    console.log('viewfile.controller: new instance');
    console.log("$stateParams.fileURL ---->", $stateParams.fileURL)
    $ionicPlatform.ready(function () {
        var url = $stateParams.fileURL;
        var filename = url.split("/").pop();
        var targetPath = cordova.file.cacheDirectory + "/" + filename;
        var options = {};
        var download = $cordovaFileTransfer.download(url, targetPath, options, true).then(function (success) {
            $scope.pdfURL = targetPath;
            $scope.instance = PDFViewerService.Instance("viewer");
            console.log("success " + JSON.stringify(success));
            updatePaging();
        }, function (error) {
            console.log("Error " + JSON.stringify(error));
        }
        );

    });
    // $scope.pdfURL = "lib/pdfviewer/test.pdf";
    // $scope.instance = PDFViewerService.Instance("viewer");
    //   updatePaging();
    $scope.nextPage = function () {
        $scope.instance.nextPage();
        updatePaging();
    };

    $scope.prevPage = function () {
        $scope.instance.prevPage();
        updatePaging();
    };

    $scope.gotoPage = function (page) {
        $scope.instance.gotoPage(page);
        updatePaging();
    };
 
    $scope.pageLoaded = function (curPage, totalPages) {
        $scope.currentPage = curPage;
        $scope.totalPages = totalPages;
    };

    $scope.loadProgress = function (loaded, total, state) {
        console.log('loaded =', loaded, 'total =', total, 'state =', state);

    };

function updatePaging()
{
    $timeout(function () {
        $scope.totalPages = $rootScope.TotalPageNo;
         $scope.lastPage=$rootScope.TotalPageNo;
        $scope.pageNum = $rootScope.CurrentPageNo;
    }, 500);

}

});