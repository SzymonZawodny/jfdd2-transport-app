(function () {
  angular.module('transportApp',
    ['ngAnimate', 'ui.bootstrap', 'LocalStorageModule'])
    .controller('panelController', panelController)
    .controller('favouritesCtrl', favouritesCtrl)
    .controller('busStopsController', busStopsController)
    .controller('ModalInstanceCtrl', closeLineDetailsModal)
    .controller('ModalInstanceCtrl', googlePlusModalDismiss)
    .controller('googlePlusModalCtrl', googlePlusModalCtrl)
    .config(function (localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('transportApp');
    });

    function panelController($scope) {
    $scope.accordion = 0;
    $scope.tab = 1;
    $scope.isCollapsed = true;

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
      else{
        if (favouriteBusStopsNames.indexOf(selected) >= 0 ) {
            $uibModal.open({
              animation: true,
              templateUrl: 'templates/favouritesNotUniqueModalTemplate.html',
              controller: 'ModalInstanceCtrl',
              size: 'md',
              scope: $scope
          });
        }
      }

      function updateFavouriteBusStops() {
        $scope.favoriteBusStops.push($scope.busStops[selectedBusStopIndex]);
        $scope.submit('favoriteBusStop', $scope.favoriteBusStops);
        $scope.busLines = uniqueLines();

        var busStopObject = function(name, count) {
          this.name = name;
          this.count = count;
        };

        //saving count for each busStop on click
        var currentCount = localStorageService.get($scope.busStops[selectedBusStopIndex].name);
        $scope.submit($scope.busStops[selectedBusStopIndex].name, currentCount+1);

        //reading from local storage
        $scope.mostPopularBusStops = [];
        for (var i = 0; i < localStorage.length; i++){
          $scope.newBusObject = new busStopObject(localStorage.key(i).split('.')[1], Number(localStorage.getItem(localStorage.key(i))));
          $scope.mostPopularBusStops.push($scope.newBusObject);
        }
        $scope.mostPopularBusStops.pop();
        $scope.mostPopularBusStops
          .sort(function(a,b) {
            return (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0);
          })
          .reverse();
        console.log($scope.mostPopularBusStops);
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

    function getDetails(busLine, busDestination, departureTime, busStopName, departureIndex) {

      $scope.busDetailsArray = [busLine, busDestination, departureTime, busStopName];
      openModal();

      $scope.filteredLineToAllDestinations = $scope.linesDetails
        .filter(function (busLine) {return busLine.line === $scope.busDetailsArray[0];})
        .map(function(destination){return destination.destination;});

      $scope.filteredLineToSpecificDestination = $scope.filteredLineToAllDestinations[0]
        .map(function(destination){return destination;})
        .filter(function(destination){return destination.destinationName === $scope.busDetailsArray[1];});

      $scope.allDepartures = $scope.filteredLineToSpecificDestination
        .map(function(item){return item.departure});

      $scope.timetable = $scope.allDepartures[0]
        .map(function(item){return item;})
        .filter(function(item){return item.index === departureIndex;});

      $scope.selectedBusStopIndex = $scope.filteredLineToSpecificDestination[0].busStops.indexOf(busStopName);
      $scope.pastBusStops = $scope.filteredLineToSpecificDestination[0].busStops.slice(0,$scope.selectedBusStopIndex);
      $scope.remainingBusStops = $scope.filteredLineToSpecificDestination[0].busStops.slice($scope.selectedBusStopIndex);

      function openModal() {
        $uibModal.open({
          animation: true,
          templateUrl: 'templates/busLineDetailsTemplate.html',
          controller: 'ModalInstanceCtrl',
          size: 'md',
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
  function busStopsController($scope,busStopService,$uibModal, lineDetailsService) {

    //symulacja serwera
    $scope.busStops = busStopService.getStops();
    $scope.linesDetails = lineDetailsService.getLinesDetails();
    $scope.showBusStopDetail = showBusStopDetail;
    $scope.getDetails = getDetails;

    function showBusStopDetail(busStop){
    $scope.busStop= busStop;
    }

    function getDetails(busLine, busDestination, departureTime, busStopName, departureIndex) {

      $scope.busDetailsArray = [busLine, busDestination, departureTime, busStopName];
      openModal();

      $scope.filteredLineToAllDestinations = $scope.linesDetails
        .filter(function (busLine) {return busLine.line === $scope.busDetailsArray[0];})
        .map(function(destination){return destination.destination;});

      $scope.filteredLineToSpecificDestination = $scope.filteredLineToAllDestinations[0]
        .map(function(destination){return destination;})
        .filter(function(destination){return destination.destinationName === $scope.busDetailsArray[1];});

      $scope.allDepartures = $scope.filteredLineToSpecificDestination
        .map(function(item){return item.departure});

      $scope.timetable = $scope.allDepartures[0]
        .map(function(item){return item;})
        .filter(function(item){return item.index === departureIndex;});

      $scope.selectedBusStopIndex = $scope.filteredLineToSpecificDestination[0].busStops.indexOf(busStopName);
      $scope.pastBusStops = $scope.filteredLineToSpecificDestination[0].busStops.slice(0,$scope.selectedBusStopIndex);
      $scope.remainingBusStops = $scope.filteredLineToSpecificDestination[0].busStops.slice($scope.selectedBusStopIndex);

      function openModal() {
        $uibModal.open({
          animation: true,
          templateUrl: 'templates/busLineDetailsTemplate.html',
          controller: 'ModalInstanceCtrl',
          size: 'md',
          scope: $scope
        });
      }
    }
  }

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

  function googlePlusModalDismiss($scope, $uibModalInstance) {
    $scope.cancel = function () {
      $uibModalInstance.dismiss('Zamknij');
    };
  }
}());
