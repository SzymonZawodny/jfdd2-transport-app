function linesCtrl($scope, lineDetailsService) {
  $scope.linesDetails = lineDetailsService.getLinesDetails();
  $scope.readLineStops = readLineStops;
  $scope.readSelectedBusStop = readSelectedBusStop;

  function readLineStops(busLine){
    $scope.selectedLineObject = $scope.linesDetails
      .filter(function(singleBusLine){
        return singleBusLine.line === busLine;
      });
  }

  function readSelectedBusStop(busStop){
    $scope.selectTab(1);
    $scope.showBusStopDetail(busStop);
  }
}