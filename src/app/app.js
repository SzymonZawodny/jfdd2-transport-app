(function () {
  angular.module('transportApp',
    ['ngAnimate', 'ui.bootstrap', 'LocalStorageModule'])
    .controller('panelController', panelController)
    .controller('favouritesCtrl', favouritesCtrl)
    .controller('linesCtrl', linesCtrl)
    .controller('busStopsController', busStopsController)
    .controller('ModalInstanceCtrl', closeLineDetailsModal)
    .controller('ModalInstanceCtrl', googlePlusModalDismiss)
    .controller('googlePlusModalCtrl', googlePlusModalCtrl)
    .config(function (localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('transportApp');
    });
}());
