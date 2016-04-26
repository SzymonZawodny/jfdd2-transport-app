(function () {
  angular.module('transportApp')
    .service('busStopService', busStopsService);

  function busStopsService() {
    var stops = [];
    var callback;
    $.ajax({
      type: 'GET',
      url: 'http://isa-api-sl.herokuapp.com/api/busStops',
      dataType: 'json',
      success: function(data){
        stops = data;
        callback(stops);
      }

    });

    this.getStops = function (callbackFcn) {
      callback = callbackFcn;

    }

  }
})();