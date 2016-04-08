(function () {
  angular.module('transportApp',
    ['ngAnimate', 'ui.bootstrap', 'LocalStorageModule'])
    .controller('panelController', panelController)
    .controller('favouritesCtrl', favouritesCtrl)
    .controller('busStopsController', busStopsController)
    .controller('ModalInstanceCtrl', closeLineDetailsModal)
    .config(function (localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('transportApp');
    });

    function panelController($scope) {
    $scope.accordion = 0;
    $scope.tab = 4;
    $scope.isCollapsed = true;
  });

    $scope.selectTab = function (setTab) {
      $scope.tab = setTab;
    };

    $scope.ifTabSelected = function (checkTab) {
      return $scope.tab === checkTab;
    }
  }

  function favouritesCtrl($scope, localStorageService, busStopService, lineDetailsService, $uibModal) {
    $scope.oneAtATime = true;

    //symulacja serwera
    $scope.busStops = busStopService.getStops();
    $scope.linesDetails = lineDetailsService.getLinesDetails();
    $scope.favoriteBusStops = localStorageService.get('favoriteBusStop') || [];
    $scope.busLines = uniqueLines();

    //funkcje do widoku
    $scope.submit = submit;
    $scope.removeFavoriteBusStop = removeFavourite;
    $scope.addBusStopToFavorites = addBusStopToFavorites;
    $scope.filterFavouritesByLines = filterFavouritesByLines;
    $scope.getDetails = getDetails;

    function submit(key, val) {
      return localStorageService.set(key, val);
    }

    function addBusStopToFavorites() {
      var selectedBusStopIndex = $("select[name='selectedBusStop'] option:selected").index();
      if ($scope.favoriteBusStops.length === 0) {
        updateFavouriteBusStops();
        return;
      }

      var selected = $('#selectedBusStop').val().trim();
      var favouriteBusStopsNames = $scope.favoriteBusStops.map(function (stop) {
        return stop.name;
      });
      if (favouriteBusStopsNames.indexOf(selected) === -1) {
        updateFavouriteBusStops();
      }

      function updateFavouriteBusStops() {
        $scope.favoriteBusStops.push($scope.busStops[selectedBusStopIndex]);
        $scope.submit('favoriteBusStop', $scope.favoriteBusStops);
        $scope.busLines = uniqueLines();
      }
    }

    function uniqueLines() {
      if ($scope.favoriteBusStops) {
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

    function filterFavouritesByLines() {
      var selectedLine = $('#selectedLine').val();
      if (selectedLine === 'Pokaż wszystkie') {
        return $scope.accordion = 0;
      }
      else{
        $scope.filteredBusStops = $scope.favoriteBusStops.filter(function (busStop) {
          return busStop.bus.some(function (bus) {
            $scope.accordion = 1;
            return bus.line === selectedLine;
          })
        });
      }
    }

    function getDetails(busLine, busDestination, departureTime, busStopName) {
      $scope.busDetailsArray = [busLine, busDestination, departureTime, busStopName];
      openModal();

      $scope.filteredBusLine = $scope.linesDetails.filter(function (busLine) {
        return busLine.line === $scope.busDetailsArray[0];
      });

      $scope.insideFilteredBusLine = $scope.filteredBusLine.map(function(destination){
        return destination.destination;
      });

      $scope.insideInside = $scope.insideFilteredBusLine.map(function(destination){
        return destination[0]; // check this line, always first item
      });

      $scope.filteredBusLineAndDestination = $scope.insideInside.filter(function(destination){
        return destination.destinationName === $scope.busDetailsArray[1];
      });

      //console.log('Lines Details: ');
      //console.log($scope.linesDetails);
      //console.log('filteredBusLine: ');
      //console.log($scope.filteredBusLine);
      //console.log('insideFilteredBusLine: ');
      //console.log($scope.insideFilteredBusLine);
      //console.log('insideInside: ');
      //console.log($scope.insideInside);
      //console.log('filteredBusLineAndDestination: ');
      //console.log($scope.filteredBusLineAndDestination);


      function openModal() {
        //console.log($scope.busDetailsArray);
        $uibModal.open({
          animation: true,
          templateUrl: 'busLineDetailsTemplate.html',
          controller: 'ModalInstanceCtrl',
          size: 'sm',
          scope: $scope
        });
      }
    }
  }

  function closeLineDetailsModal($scope, $uibModalInstance) {
    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };
  }
  function busStopsController($scope,busStopService) {

    //symulacja serwera
    $scope.busStops = busStopService.getStops();
    $scope.showBusStopDetail = showBusStopDetail;

    function showBusStopDetail(busStop){

    $scope.busStop= busStop;
    }



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

    console.log(modalInstance);


    modalInstance.rendered.then(function () {
      console.log(document.getElementById('my-signin2'));

      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSignIn,
        'onfailure': signOut
      });
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
}());
