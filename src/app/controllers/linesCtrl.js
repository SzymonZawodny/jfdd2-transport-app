function linesCtrl($scope, lineDetailsService) {
  $scope.linesDetails = lineDetailsService.getLinesDetails();
  $scope.readLineStops = readLineStops;

  function readLineStops(busLine){
    $scope.selectedLineObject = $scope.linesDetails
      .filter(function(singleBusLine){
        return singleBusLine.line === busLine;
      });
  }

  $scope.$watch('ifTabSelected(2)', function() {
    $scope.selectedLine = $scope.linesDetails.filter(function(singleLine){
        return singleLine.line === selectedLineName;
    });
      if ($scope.selectedLine[0] !== undefined){
        $scope.readLineStops($scope.selectedLine[0].line);
      }

  });
}