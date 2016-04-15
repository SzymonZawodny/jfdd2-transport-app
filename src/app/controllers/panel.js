function panelController($scope, $log) {
  $log.info('panel controller initialized');
  $scope.accordion = 0;
  $scope.tab = 1;
  $scope.isCollapsed = true;

  $scope.selectTab = function (setTab) {
    if (setTab >0 && setTab<=4){
      $scope.tab = setTab;
    }
    else $scope.tab = 1;
  };

  $scope.ifTabSelected = function (checkTab) {
    return $scope.tab === checkTab;
  }
}
