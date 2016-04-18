var selectedBusStopName = "";

function panelController($scope) {
  $scope.accordion = 0;
  $scope.tab = 2;
  $scope.isCollapsed = true;

  $scope.selectTab = function (setTab) {
    if (setTab >0 && setTab<=4){
      $scope.tab = setTab;
    }
    else $scope.tab = 1;
  };

  $scope.ifTabSelected = function (checkTab) {
    return $scope.tab === checkTab;
  };

  $scope.showBusStopDetail = function showBusStopDetail(busStop){
    $scope.busStop = busStop;
  };

  $scope.readSelectedBusStop = function readSelectedBusStop(busStop){
    $scope.selectTab(1);
    selectedBusStopName = busStop;
  };
}