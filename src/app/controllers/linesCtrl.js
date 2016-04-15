function linesCtrl($scope, lineDetailsService) {
  $scope.linesDetails = lineDetailsService.getLinesDetails();
  $scope.readLineStops = readLineStops;

  function readLineStops(busLine){
    $scope.selectedLineObject = $scope.linesDetails
      .filter(function(singleBusLine){
        return singleBusLine.line === busLine;
      });
  }
}