// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ui.router', 'ionic-toast', 'starter.services', 'pdf', 'Quran.pdf.Module',
    'Quran.Video.module',
    'Quran.Audio.module',
    'ngCordova','ngProgress',
    'login.module.controller',
    'registration.module.controller',
    'myaccount.module.controller',
    'community.module.controller',
    'account.module.controller',
    'main.module.controller',
    'http.service.module',
    'addfile.module.controller',
    'viewfile.module.controller',
    'forgotpassword.module.controller',
    
    'addpost.module.controller',
    'viewpost.module.controller'
])
    .run(function ($rootScope, $ionicPlatform, $state, $ionicHistory, $location) {
        $ionicPlatform.ready(function () {

            $ionicPlatform.registerBackButtonAction(function (e) {

                if ($state.current.name == 'login') {
                    ionic.Platform.exitApp();

                }
                else if ($state.current.name == 'myaccount') {
                    $rootScope.loginStatus = true;
                    $rootScope.footerIcoSelection = 1;
                    $state.go('tab.dash', { tabid: 1 }, { reload: true });
                }
                else if ($state.current.name == 'addfile' || $state.current.name == 'viewfile') {
                    $rootScope.loginStatus = true;
                    $ionicHistory.goBack();
                }
                else if ($ionicHistory.backView()) {
                    $ionicHistory.goBack();
                }
                e.preventDefault();
                return false;
            }, 101);
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

    .config(function ($stateProvider, $urlRouterProvider) {

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
                cache: false,
                url: '/dash/:tabid',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/Quran.pdf.html',
                        controller: 'Quran.pdf.Controller'
                    }
                }
            })
            .state('tab.chats', {
                cache: false,
                url: '/chats/:tabid',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/Quran.Video.html',
                        controller: 'Quran.Video.Controller'
                    }
                }
            })
            .state('tab.account', {
                cache: false,
                url: '/account/:tabid',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/Quran.Audio.html',
                        controller: 'Quran.Audio.Controller'
                    }
                }
            }).state('login', {
                cache: false,
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'login.controller as l',
            }).state('registration', {
                cache: false,
                url: '/registration',
                templateUrl: 'templates/registration.html',
                controller: 'registration.controller',
            }).state('forgotpassword', {
                cache: false,
                url: '/forgotpassword',
                templateUrl: 'templates/forgotpassword.html',
                controller: 'forgotpassword.controller',
                params: {fileURL:''}
            }).state('myaccount', {
                cache: false,
                url: '/myaccount',
                templateUrl: 'templates/myaccount.html',
                controller: 'myaccount.controller',
            }).state('community', {
                cache: false,
                url: '/community',
                templateUrl: 'templates/community.html',
                controller: 'community.controller'
             
            }).state('addfile', {
                cache: false,
                url: '/addfile',
                templateUrl: 'templates/addfile.html',
                controller: 'addfile.controller',
            }).state('viewfile', {
                cache: false,
                url: '/viewfile',
                templateUrl: 'templates/viewfile.html',
                controller: 'viewfile.controller',
                params: {fileURL:''}
            }).state('addpost', {
                cache: false,
                url: '/addpost',
                templateUrl: 'templates/addpost.html',
                controller: 'addpost.controller'
            
            }).state('viewpost', {
                cache: false,
                url: '/viewpost',
                templateUrl: 'templates/viewpost.html',
                controller: 'viewpost.controller',
                 params: {postData:{}}
            });







        // if none of the above states are matched, use this as the fallback
        // $urlRouterProvider.otherwise('/tab/dash');
        $urlRouterProvider.otherwise('main');

    });
