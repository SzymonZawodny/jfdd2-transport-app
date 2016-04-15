function panelController($scope) {
  $scope.accordion = 0;
  $scope.tab = 2;
  $scope.isCollapsed = true;

  $scope.selectTab = function (setTab) {
    $scope.tab = setTab;
  };

  $scope.ifTabSelected = function (checkTab) {
    return $scope.tab === checkTab;
  }
}