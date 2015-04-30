// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function () {


    var starter = angular.module('starter', ['ionic', 'firebase', 'app']);

    starter.run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    });

    starter.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'MenuController'
            })

            .state('login', {
                url: "/login",
                templateUrl: "templates/login.html",
                controller: 'LoginController'
            })

            .state('app.acompanhamento', {
                url: "/acompanhamento",
                views: {
                    'menuContent': {
                        templateUrl: "templates/acompanhamento.html",
                        controller: 'AcompanhamentoController'
                    }
                }
            })

            .state('app.view', {
                url: "/view/{idActivity}",
                views: {
                    'menuContent': {
                        templateUrl: "templates/view.html",
                        controller: 'ViewController'
                    }
                }
            })


            .state('app.cadastro', {
                url: "/cadastro",
                views: {
                    'menuContent': {
                        templateUrl: "templates/cadastro.html"
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('login');
    });

})();
