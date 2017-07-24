angular.module('Quran.pdf.module.controller', []).controller('Quran.pdf.controller', function ($scope, pdfDelegate) {
  
    $scope.relativity = 'http://gmcsco.com/para.pdf';
    $scope.material = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/149125/material-design-2.pdf';

    $scope.pdfUrl = $scope.relativity;

})