angular.module('transportApp', ['ngAnimate', 'ui.bootstrap']);

//hamburger menu
angular.module('transportApp')
  .controller('collapseMenu', function ($scope) {
  $scope.isCollapsed = true;
});


angular.module('transportApp').controller('busStopAccordion', function ($scope) {
  $scope.oneAtATime = true;

  $scope.items = ['Przystanek1'];

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
});