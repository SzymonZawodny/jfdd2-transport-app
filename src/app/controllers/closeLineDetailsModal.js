function closeLineDetailsModal($scope, $uibModalInstance) {
  $scope.cancel = function () {
    $uibModalInstance.dismiss();
  };
}