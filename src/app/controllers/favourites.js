function favouritesCtrl($scope, localStorageService, busStopService, lineDetailsService, $uibModal) {
  $scope.oneAtATime = true;

  //symulacja serwera
  $scope.busStops = busStopService.getStops();
  $scope.linesDetails = lineDetailsService.getLinesDetails();


  $scope.allUsersFavourites = localStorageService.get('allUsersFavourites') || [];
  $scope.userEmail = userEmail;
  $scope.favoriteBusStops = [];
  $scope.user = {};
  $scope.filteredUser = {};
  $scope.busLines = uniqueLines($scope.favoriteBusStops);
  $scope.mostPopularBusStops = [];

  $scope.$watch('ifTabSelected(4)', function() {
    readFavouriteBusStops();
  });

  //funkcje do widoku
  $scope.submit = submit;
  $scope.removeFavoriteBusStop = removeFavourite;
  $scope.addBusStopToFavorites = addBusStopToFavorites;
  $scope.filterFavouritesByLines = filterFavouritesByLines;
  $scope.getDetails = getDetails;
  $scope.showMostPopularStops = showMostPopularStops;
  $scope.sort = sort;
  $scope.newBusStopObject = newBusStopObject;
  $scope.uniqueLines = uniqueLines;
  readMostPopularFromLocalStorage();

  function submit(key, val) {
    return localStorageService.set(key, val);
  }

  function sort(arrayToSort){
      $scope.result = arrayToSort
      .sort(function(a,b) {
        return (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0);
      })
      .reverse();
  }

  function newBusStopObject (name, count){
    $scope.newBusStopObjectInstance = {};
    if (name !== "" && name !== " " && name !== undefined){
      var BusStopObject = function(name, count) {
        this.name = name;
        this.count = count;
      };
      $scope.newBusStopObjectInstance = new BusStopObject(name, count);
    }
  }

  function readMostPopularFromLocalStorage(){

    $scope.mostPopularBusStops=[];
    for (var i = 0; i < localStorage.length; i++){
      newBusStopObject(localStorage.key(i).split('.')[1],
        Number(localStorage.getItem(localStorage.key(i))));
      $scope.mostPopularBusStops.push($scope.newBusStopObjectInstance);
    }
    $scope.mostPopularBusStops.pop();
    sort($scope.mostPopularBusStops);
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

    function createFilteredUser() {
      $scope.filteredUser = {
        userEmail: userEmail,
        favouriteBusStops: $scope.favoriteBusStops
      };
    }

    function updateFavouriteBusStops() {
      readFavouriteBusStops();

      $scope.favoriteBusStops.push($scope.busStops[selectedBusStopIndex]);

      createFilteredUser();

      $scope.allUsersFavourites.push($scope.filteredUser);
      $scope.submit('allUsersFavourites', $scope.allUsersFavourites);
      $scope.busLines = uniqueLines($scope.favoriteBusStops);

      //saving count for each busStop on click
      var currentCount = localStorageService.get($scope.busStops[selectedBusStopIndex].name);
      $scope.submit($scope.busStops[selectedBusStopIndex].name, currentCount+1);

      readMostPopularFromLocalStorage();
    }
  }

  function readFavouriteBusStops(){
    $scope.user = $scope.allUsersFavourites.filter(function(user){
      return user.userEmail === userEmail;
    });
    if ($scope.user[0] !== undefined) {
      $scope.favoriteBusStops = $scope.user[0].favouriteBusStops || [];
    }
  }

  function uniqueLines(favoriteBusStops) {
    if (favoriteBusStops) {
      return favoriteBusStops.map(function (stop) {
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
    $scope.submit('allUsersFavourites', $scope.allUsersFavourites);
    $scope.busLines = uniqueLines($scope.favoriteBusStops);
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

  function showMostPopularStops(){
    openModal();

    function openModal() {
      $uibModal.open({
        animation: true,
        templateUrl: 'templates/mostPopularBusStops.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        scope: $scope
      });
    }
  }
}