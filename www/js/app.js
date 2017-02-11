var sideMenuApp = angular.module('sideMenuApp', ['ionic', 'sideMenuApp.controllers', 'sideMenuApp.services','ngStorage','ngCordova']);

sideMenuApp.config(function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})
sideMenuApp.config(['$stateProvider', '$urlRouterProvider','$localStorageProvider',
    function($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        .state('dictionary', {
            url: '/dictionary',
            controller: 'DictionaryController',
            templateUrl: 'templates/dictionary.html'
        })
        .state('favoris', {
            url: '/favoris',
            controller: 'FavorisController',
            templateUrl: 'templates/favoris.html'
        })
        .state('historique', {
            url: '/historique',
            controller: 'HistoriqueController',
            templateUrl: 'templates/historique.html'
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/dictionary');
    }
])