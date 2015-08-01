angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('FiltersCtrl', function($scope) {
  
})
.controller('MapCtrl', function($scope, $cordovaGeolocation) {
  var posOptions = {
        timeout: 10000, 
        enableHighAccuracy: false
      },
      watchOptions = {
        frequency : 1000,
        timeout : 3000,
        enableHighAccuracy: false // may cause errors if true
      },
      watch = $cordovaGeolocation.watchPosition(watchOptions);

  $scope.myLocation = {
    lng : '',
    lat: ''
  };

  /* http://www.gajotres.net/using-google-maps-with-ionic-framework/ */
  $scope.drawMap = function(position) {
    $scope.myLocation.lng = position.coords.longitude;
    $scope.myLocation.lat = position.coords.latitude;
    $scope.map = {
      center: {
        latitude: $scope.myLocation.lat,
        longitude: $scope.myLocation.lng
      },
      zoom: 14,
      pan: 1
    };
    $scope.marker = {
      id: 0,
      coords: {
        latitude: $scope.myLocation.lat,
        longitude: $scope.myLocation.lng
      }
    }; 
    $scope.marker.options = {
      draggable: false,
      labelContent: "lat: " + $scope.marker.coords.latitude + '<br/> ' + 'lon: ' + $scope.marker.coords.longitude,
      labelAnchor: "80 120",
      labelClass: "marker-labels"
    };
  };

  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.drawMap(position);
    }, function(err) {
      // error
    });

  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      $scope.drawMap(position);
  });
})
.controller('AccountCtrl', function($scope, $cordovaOauth) {
  $scope.facebookLogin = function() {
    $cordovaOauth.facebook("CLIENT_ID").then(function(result) {
      $scope.session = result;
    }, function(error) {
      console.log(error);
    });
  };
  $scope.googleLogin = function() {
    $cordovaOauth.google("CLIENT_ID_HERE").then(function(result) {
        console.log(JSON.stringify(result));
    }, function(error) {
        console.log(error);
    });
  }
});