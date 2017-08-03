// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic-toast','starter.services','pdf', 'Quran.pdf.Module',
    'Quran.Video.module', 'Quran.Audio.module', 'ChatDetail.module',
'login.module.controller', 'registration.module.controller','myaccount.module.controller', 'main.module.controller', 'http.service.module'
])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html'
      })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/Quran.pdf.html',
                controller: 'Quran.pdf.Controller'
            }
        }
    })

    .state('tab.chats', {
        url: '/chats',
        views: {
            'tab-chats': {
                templateUrl: 'templates/Quran.Video.html',
                controller: 'Quran.Video.Controller'
            }
        }
    })
      .state('tab.chat-detail', {
          url: '/chats/:chatId',
          views: {
              'tab-chats': {
                  templateUrl: 'templates/chat-detail.html',
                  controller: 'ChatDetailCtrl'
              }
          }
      })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/Quran.Audio.html',
                controller: 'Quran.Audio.Controller'
            }
        }
    }).state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'login.controller as l',
    }).state('registration', {
        url: '/registration',
        templateUrl: 'templates/registration.html',
        controller: 'registration.controller',
    }).state('myaccount', {
        url: '/myaccount',
        templateUrl: 'templates/myaccount.html',
        controller: 'myaccount.controller',
    });





  

  // if none of the above states are matched, use this as the fallback
 // $urlRouterProvider.otherwise('/tab/dash');
 $urlRouterProvider.otherwise('main');

});
