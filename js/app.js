angular.module('transportApp', ['ngAnimate', 'ui.bootstrap']);

//hamburger menu
angular.module('transportApp')
  .controller('collapseMenu', function ($scope) {
  $scope.isCollapsed = true;
});


