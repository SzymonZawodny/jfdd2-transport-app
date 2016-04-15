function linesCtrl($scope, lineDetailsService) {

  $scope.linesDetails = lineDetailsService.getLinesDetails();
}