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

  function addToFavorites($scope, localStorageService) {
    $scope.addBusStopToFavorites = function () {
      var selectedBusStopIndex = $("select[name='selectedBusStop'] option:selected").index();
      $scope.favoriteBusStops.push($scope.busStops[selectedBusStopIndex]);

      function submit(key, val) {
        return localStorageService.set(key, val);
      }

      submit('favoriteBusStop', $scope.favoriteBusStops);
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
  });

}());
