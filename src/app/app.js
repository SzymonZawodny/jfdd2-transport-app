  var app = angular.module('transportApp', ['ngAnimate', 'ui.bootstrap']);

//hamburger menu
app.controller('collapseMenu', function ($scope) {
    $scope.isCollapsed = true;
  });


app.controller('busStopAccordion', function ($scope) {
  $scope.oneAtATime = true;

  $scope.busStops = [
    {
      name: 'Fiołkowa',
      bus: [
        {
          line: '145',
          destination: 'Buraczana',
          departures: ['0800', '0830']
        },
        {
          line: '160',
          destination: 'Słonecza',
          departures: ['0807', '0837']
        }
      ]
    },
    {
      name: 'Buraczana',
      bus: [
        {
          line: '145',
          destination: 'Fiołkowa',
          departures: ['0805', '0835']
        },
        {
          line: '160',
          destination: 'Słonecza',
          departures: ['0809', '0840']
        }
      ]
    },
    {
      name: 'Słoneczna',
      bus: [
        {
          line: '145',
          destination: 'Fiołkowa',
          departures: ['0805', '0835']
        },
        {
          line: '160',
          destination: 'Słonecza',
          departures: ['0809', '0840']
        }
      ]
    },
    {
      name: 'Gdańska',
      bus: [
        {
          line: '145',
          destination: 'Fiołkowa',
          departures: ['0805', '0835']
        },
        {
          line: '160',
          destination: 'Słonecza',
          departures: ['0809', '0840']
        }
      ]
    }
  ];

  $scope.favoriteBusStops = [
    {
      name: 'Fiołkowa',
      bus: [
        {
          line: '145',
          destination: 'Buraczana',
          departures: ['0800', '0830']
        },
        {
          line: '160',
          destination: 'Słonecza',
          departures: ['0807', '0837']
        }
      ]
    }
  ];
});

app.controller('addToFavorites', addToFavorites);

function addToFavorites($scope){
  $scope.addBusStopToFavorites = function(){
    var selectedBusStopIndex = $("select[name='selectedBusStop'] option:selected").index();
    $scope.favoriteBusStops.push($scope.busStops[selectedBusStopIndex]);
  };
}

app.controller('googlePlusModalCtrl', googlePlusModalCtrl);

  function googlePlusModalCtrl($scope, $uibModal){

    $scope.items = ['item1'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    };
  }

  // Please note that $uibModalInstance represents a modal window (instance) dependency.
  // It is not the same as the $uibModal service used above.

  angular.module('transportApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

    $scope.cancel = function () {
      $uibModalInstance.dismiss('Zamknij');
    };
  });
