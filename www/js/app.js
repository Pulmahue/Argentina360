// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'ionic.service.core',
  'ionic.service.push',
  'starter.controllers',
  'ngCordova',
  'pascalprecht.translate',
  'uiGmapgoogle-maps'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicAppProvider, $translateProvider, uiGmapGoogleMapApiProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: '64536879',
    // The public API key all services will use for this app
    api_key: '3b9ffa0b96b368e951f39762afd0220376d494d9c0b0097b',
    // Set the app to use development pushes
    dev_push: true
  });

  // TRANSLATIONS
  $translateProvider
    .useStaticFilesLoader({
      prefix: 'languages/',
      suffix: '.json'
    })
    .registerAvailableLanguageKeys(['es', 'en'], {
      'en' : 'en', 'en_GB': 'en', 'en_US': 'en',
      'es' : 'es', 'es_AR': 'es', 'es_ES': 'es'
    })
    .preferredLanguage('es')
    .fallbackLanguage('es')
    .useSanitizeValueStrategy('escapeParameters');

  // STATES
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.favourites', {
      url: '/favourites',
      views: {
        'menuContent': {
          templateUrl: 'templates/favourites.html'
        }
      }
    })
    .state('app.map', {
      url: '/map',
      views: {
        'menuContent': {
          templateUrl: 'templates/map.html',
          controller: 'MapCtrl'
        }
      }
    })
    .state('app.mapConfiguration', {
      url: '/mapConfiguration',
      views: {
        'menuContent': {
          templateUrl: 'templates/mapConfiguration.html'
        }
      }
    })
    .state('app.filters', {
      url: '/filters',
      views: {
        'menuContent': {
          templateUrl: 'templates/filters.html',
          controller: 'FiltersCtrl'
        }
      }
    })
    .state('app.account', {
      url: '/account',
      views: {
        'menuContent': {
          templateUrl: 'templates/account.html',
          controller: 'AccountCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/favourites');

  uiGmapGoogleMapApiProvider.configure({
    //    key: 'your api key',
    v: '3.17',
    libraries: 'weather,geometry,visualization',
    argentina: true
  });
});
