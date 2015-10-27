var app = angular.module('starter.controllers', []);

app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.title = "i9";

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

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('SignupCtrl', function($scope, $stateParams) {
    $scope.newUser = {};
    $scope.doSignup = function() {
        console.log($scope.newUser.username+" LOading....");
    };
})

.controller('MinhaLocalizacaoController', function($scope, $ionicSideMenuDelegate, geolocation, $http, $location) {
    console.log('MinhaLocalizacaoController');

    $ionicSideMenuDelegate.canDragContent(false)
    geolocation.getLocation().then(function(data) {
        $scope.minhasCoordenadas = {
            latitude: data.coords.latitude,
            longitude: data.coords.longitude
        };
        $scope.mapa = {
            center: angular.copy($scope.minhasCoordenadas),
            zoom: 17
        };

        $scope.meuMarcador = {
            id: 0,
            coords: angular.copy($scope.minhasCoordenadas),
            options: {
                icon: '../../../img/marcador.png',
                labelContent: "Você está aqui!"
            }
        };

        $scope.meuRaio = {
            center: angular.copy($scope.minhasCoordenadas),
            radius: 100,
            stroke: {
                color: '#00FF00',
                weight: 2,
                opacity: 0.4
            },
            fill: {
                color: '#00FF00',
                opacity: 0.2
            },
            visible: true
        };

        $http.get('http://10.30.1.136:8888/produtos', {
            params: {
                latitude: $scope.meuMarcador.coords.latitude,
                longitude: $scope.meuMarcador.coords.longitude
            }
        }).then(function(response) {
            if (response.data) {
                $scope.produtos = response.data;
                $scope.marcadorProdutos = [];
                angular.forEach($scope.produtos, function(produto) {
                    var marcador = {
                        id: produto._id,
                        coords: {
                            latitude: produto.loc.coordinates[0],
                            longitude: produto.loc.coordinates[1]
                        },
                        options: {
                            icon: '../../../img/marcador.png'
                        },
                        window: {
                            options : {
                                content: produto.nome
                            }
                        }
                    };
                    $scope.marcadorProdutos.push(marcador);
                });
            }
        });
    });
})
.controller('DashCtrl', function($scope) {
  
  var deploy = new Ionic.Deploy();
  
  // Update app code with new release from Ionic Deploy
  $scope.doUpdate = function() {
    deploy.update().then(function(res) {
      console.log('Ionic Deploy: Update Success! ', res);
    }, function(err) {
      console.log('Ionic Deploy: Update error! ', err);
    }, function(prog) {
      console.log('Ionic Deploy: Progress... ', prog);
    });
  };

  // Check Ionic Deploy for new code
  $scope.checkForUpdates = function() {
    console.log('Ionic Deploy: Checking for updates');
    deploy.check().then(function(hasUpdate) {
      console.log('Ionic Deploy: Update available: ' + hasUpdate);
      $scope.hasUpdate = hasUpdate;
    }, function(err) {
      console.error('Ionic Deploy: Unable to check for updates', err);
    });
  }
});
