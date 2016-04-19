(function () {
  angular.module('transportApp')
    .service('lineDetailsService', lineDetailsService);

  function lineDetailsService() {
    var lines = [];
    $.ajax({
      type: 'GET',
      url: 'https://isa-api2.herokuapp.com/transport/lines',
      dataType: 'json',
      success: function(data){
        stops = data.lines;
        console.log(data.lines);
      }

    });

    this.getLinesDetails = function () {
      return lines;
    }
  }
})();