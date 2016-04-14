function googlePlusModalCtrl($scope, $uibModal){

  $scope.items = ['item1'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    console.log(modalInstance);
    modalInstance.rendered.then(function () {
      console.log(document.getElementById('my-signin2'));

      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSignIn,
        'onfailure': signOut
      });
    });
  };
}

function googlePlusModalDismiss($scope, $uibModalInstance) {
  $scope.cancel = function () {
    $uibModalInstance.dismiss('Zamknij');
  };
}