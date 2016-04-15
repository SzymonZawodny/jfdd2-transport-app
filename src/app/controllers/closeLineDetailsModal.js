function closeLineDetailsModal($scope, $uibModalInstance, $log) {
  $log.info('close line details');
  $scope.cancel = function () {
    $uibModalInstance.dismiss();
  };
}
