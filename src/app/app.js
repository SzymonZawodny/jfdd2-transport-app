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

  $scope.showDetails = function(busStop){
    $scope.busDetails = busStop

  }
});

app.controller('addToFavorites', addToFavorites);

function addToFavorites($scope){
  $scope.addBusStopToFavorites = function(){
    var selectedBusStopIndex = $("select[name='selectedBusStop'] option:selected").index();
    $scope.favoriteBusStops.push($scope.busStops[selectedBusStopIndex]);
  };
}


//  function NewBusStop(name, bus, destination, departures){
//    this.name = name;
//    this.bus = bus;
//    this.destination = destination;
//    this.departures = departures;
//  }
//}

//angular.module('transportApp').controller('panelController', function($scope){
//  $scope.tab = 4;
//
//  $scope.selectTab = function(setTab) {
//    $scope.tab = setTab;
//  };
//
//  $scope.isSelected = function(checkTab){
//    return $scope.tab === checkTab;
//  }
//});