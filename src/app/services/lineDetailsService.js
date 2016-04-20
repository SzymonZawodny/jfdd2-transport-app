(function () {
  angular.module('transportApp')
    .service('lineDetailsService', lineDetailsService);

  function lineDetailsService() {
    var lines = [];
    var callback;
    $.ajax({
      type: 'GET',
      url: 'http://isa-api-sl.herokuapp.com/api/busLines',
      dataType: 'json',
      success: function(data){
        lines = data;
        callback(lines);
      }
    });

    this.getLinesDetails = function (callbackFcn) {
      callback = callbackFcn;
    }
  }
})();