(function () {
  var app = angular.module('transportApp',
    ['ngAnimate', 'ui.bootstrap', 'LocalStorageModule'])
    .controller('collapseMenu', hamburgerMenuSlide)
    .controller('addToFavorites', addToFavorites)
    .controller('panelController', highlightMenuItems)
    .config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('transportApp');
  });



//hamburger menu
  function hamburgerMenuSlide($scope) {
    $scope.isCollapsed = true;
  }

  function addToFavorites($scope) {
    $scope.addBusStopToFavorites = function () {
      var selectedBusStopIndex = $("select[name='selectedBusStop'] option:selected").index();
      $scope.favoriteBusStops.push($scope.busStops[selectedBusStopIndex]);
      $scope.submit('favoriteBusStop', $scope.favoriteBusStops);
    };
  }

  // highlight menu elements
  function highlightMenuItems($scope) {
    $scope.tab = 4;

    $scope.selectTab = function (setTab) {
      $scope.tab = setTab;
    };

    $scope.ifTabSelected = function (checkTab) {
      return $scope.tab === checkTab;
    }
  }


  app.controller('busStopAccordion', function ($scope, localStorageService) {
    $scope.oneAtATime = true;

    $scope.submit=function(key, val) {
      return localStorageService.set(key, val);
    };

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

    function getItem(key) {
      return localStorageService.get(key);
    }

    $scope.favoriteBusStops = getItem('favoriteBusStop');

    $scope.busLines = $scope.favoriteBusStops.map(function (stop) {
      return stop.bus.map(function (bus) {
        return bus.line;
      });
    }).reduce(function (a, b) {
      return a.concat(b);
    }, []).filter(onlyUnique);

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    $scope.removeFavoriteBusStop = function (idx, e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      $scope.favoriteBusStops.splice(idx, 1);
      $scope.submit('favoriteBusStop', $scope.favoriteBusStops);
    };
  });

}());
