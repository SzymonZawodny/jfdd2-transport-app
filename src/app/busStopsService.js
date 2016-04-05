(function () {
  angular.module('transportApp')
    .service('busStopService', busStopsService);

  function busStopsService() {
    var stops = [
      {
        name: 'Fiołkowa',
        bus: [
          {
            line: '145',
            destination: 'Buraczana',
            departures: ['0800', '0830']
          },
          {
            line: '160',
            destination: 'Słonecza',
            departures: ['0807', '0837']
          }
        ]
      },
      {
        name: 'Buraczana',
        bus: [
          {
            line: '145',
            destination: 'Fiołkowa',
            departures: ['0805', '0835']
          },
          {
            line: '160',
            destination: 'Słonecza',
            departures: ['0809', '0840']
          }
        ]
      },
      {
        name: 'Słoneczna',
        bus: [
          {
            line: '145',
            destination: 'Fiołkowa',
            departures: ['0805', '0835']
          },
          {
            line: '160',
            destination: 'Słonecza',
            departures: ['0809', '0840']
          }
        ]
      },
      {
        name: 'Gdańska',
        bus: [
          {
            line: '145',
            destination: 'Fiołkowa',
            departures: ['0805', '0835']
          },
          {
            line: '160',
            destination: 'Słonecza',
            departures: ['0809', '0840']
          }
        ]
      }
    ];

    this.getStops = function () {
      return stops;
    }
  }
})();