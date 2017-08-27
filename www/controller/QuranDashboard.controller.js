angular.module('Quran.pdf.Module', []).controller('Quran.pdf.Controller', function ($scope, $rootScope, pdfDelegate, $state,httpServices,) {
  $scope.showDelegate=false;
    $scope.Files = {};
    var queryStr = 'FileType=1&FileCategory=' + $rootScope.footerIcoSelection;
    httpServices.get('/GetFiles?' + queryStr).then(function (response) {
        $scope.Files = response.data;
        
    }, function (error) {
    });

$scope.OpenPDF=function(fileURL){
  $state.go('viewfile',{fileURL:fileURL});
};

    $scope.AddFile = function () {
        $rootScope.TabID = "1";
        $state.go("addfile");
    };
})