angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, pdfDelegate) {
    $scope.relativity = 'https://tech.ebu.ch/docs/tech/tech3285.pdf';
    $scope.material = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/149125/material-design-2.pdf';

    $scope.pdfUrl = $scope.relativity;

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
