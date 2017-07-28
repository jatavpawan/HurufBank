angular.module('main.module.controller', []).controller('main', function ($scope, $state, httpServices, $ionicLoading, ionicToast, $rootScope) {

    //$rootScope.profilePicture = "img/classprofile.png";
    //$scope.signOut = function () {
    //    $rootScope.loginStatus = false;
    //    $rootScope.profilePicture = "img/classprofile.png";
    //    localStorage.setItem("UserID", "");
    //}

    //$scope.getCategoryBlog = function (BlogID, CategoryID) {
    //    httpServices.Bloglist(BlogID, CategoryID);
    //}
    //httpServices.Bloglist('L', null);

    //httpServices.get('/GetCategoryList/L').then(function (response) {
    //    $scope.values = response.data.GetCategoryListResult;
    //}, function (error) {

    //});

    $state.go('login');


})