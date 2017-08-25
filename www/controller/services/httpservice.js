angular.module('http.service.module', []).service('httpServices', ['$q', '$http', '$ionicLoading', '$rootScope', '$state', function ($q, $http, $ionicLoading, $rootScope, $state) {
    var url = 'http://hurufwebsvc.gmcsco.com/';
// var url = 'http://localhost:61331/';
  this.get=function(urlres){
      var q = $q.defer();
      $ionicLoading.show();
      $http.get(url+urlres).then(function (result) {
         
          q.resolve(result);
          $ionicLoading.hide();
      }, function (error) {
          q.reject(error);
          alert(JSON.stringify(error));
      })
      return q.promise;
  }
  this.post = function (urlres, data) {
   
      var q = $q.defer();
      $ionicLoading.show();
      $http.post(url+urlres, data).then(function (result) {
          $ionicLoading.hide();
          q.resolve(result);
      }, function (error) {
          q.reject(error);
        console.log(JSON.stringify(error));
      });
      return q.promise;
  }


  this.Bloglist = function (BlogID, CategoryID) {
      var q = $q.defer();
    //  alert(BlogID + ',' + CategoryID);
      $ionicLoading.show();
      this.get('/GetBlogList/' + BlogID + '/' + CategoryID).then(function (response) {
      
          $rootScope.blogvalues = response.data.GetBlogListResult;
          $ionicLoading.hide();
          q.resolve(response);
          $state.go("dashboard");
      }, function (error) {  q.reject(error);
          alert(JSON.stringify(error));
      });  return q.promise;
  }

     

}]);