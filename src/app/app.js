(function () {
  var app = angular.module('transportApp',
    ['ngAnimate', 'ui.bootstrap', 'LocalStorageModule'])
    .controller('panelController', panelController)
    .controller('addToFavorites', addToFavorites)
    .controller('favouritesCtrl', favouritesCtrl)
    .config(function (localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('transportApp');
    });

  function panelController($scope) {
    $scope.tab = 4;
    $scope.isCollapsed = true;

    $scope.selectTab = function (setTab) {
      $scope.tab = setTab;
    };

    $scope.ifTabSelected = function (checkTab) {
      return $scope.tab === checkTab;
    }
  }

  function addToFavorites($scope) {

  }

  function favouritesCtrl($scope, localStorageService, busStopService) {
    $scope.oneAtATime = true;

    //symulacja serwera
    $scope.busStops = busStopService.getStops();
    $scope.favoriteBusStops = localStorageService.get('favoriteBusStop') || [];
    $scope.busLines = uniqueLines();

    //funkcje do widoku
    $scope.submit = submit;
    $scope.removeFavoriteBusStop = removeFavourite;
    $scope.addBusStopToFavorites = addBusStopToFavorites;

    function submit(key, val) {
      return localStorageService.set(key, val);
    }

    function addBusStopToFavorites() {
      var selectedBusStopIndex = $("select[name='selectedBusStop'] option:selected").index();
      if ($scope.favoriteBusStops.length===0){
        updateFavouriteBusStops();
        return;
      }

      var selected = $('#selectedBusStop').val().trim();
      var favouriteBusStopsNames = $scope.favoriteBusStops.map(function (stop){
        return stop.name;
      });
      if(favouriteBusStopsNames.indexOf(selected)===-1){
        updateFavouriteBusStops();
      }

      function updateFavouriteBusStops(){
        $scope.favoriteBusStops.push($scope.busStops[selectedBusStopIndex]);
        $scope.submit('favoriteBusStop', $scope.favoriteBusStops);
        $scope.busLines = uniqueLines();
      }
    }

    function uniqueLines() {
      if ($scope.favoriteBusStops){
        return $scope.favoriteBusStops.map(function (stop) {
          return stop.bus.map(function (bus) {
            return bus.line;
          });
        }).reduce(function (a, b) {
          return a.concat(b);
        }, []).filter(onlyUnique);

        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }
      }
    }

    function removeFavourite(idx, e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      $scope.favoriteBusStops.splice(idx, 1);
      $scope.submit('favoriteBusStop', $scope.favoriteBusStops);
      $scope.busLines = uniqueLines();
    }
  }

}());
