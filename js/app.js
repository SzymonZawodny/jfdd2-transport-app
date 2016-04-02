angular.module('transportApp', ['ngAnimate', 'ui.bootstrap']);

//hamburger menu
angular.module('transportApp')
  .controller('collapseMenu', function ($scope) {
    $scope.isCollapsed = true;
  });


angular.module('transportApp').controller('busStopAccordion', function ($scope) {
  $scope.oneAtATime = true;

  $scope.favoriteBusStops = [
    {
      name: 'Buraczana',
      bus: '145',
      destination: 'Karwiny szkoła',
      departures: ['0808', '0838', '0908']
    },
    {
      name: 'Strzelców',
      bus: '125',
      destination: 'Źródło Marii',
      departures: ['0805', '0835', '0905']
    }
  ];
});

angular.module('transportApp')
  .controller('addToFavorites', addToFavorites);

function addToFavorites($scope){
  $scope.addBusStopToFavorites = function(){
    $scope.favoriteBusStops.push(new NewBusStop("Przykład app.js l:34","","",""));
    console.log("pushed");
  };

  function NewBusStop(name, bus, destination, departures){
    this.name = name;
    this.bus = bus;
    this.destination = destination;
    this.departures = departures;
  }
}

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