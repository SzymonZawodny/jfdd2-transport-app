(function () {
  angular.module('transportApp')
    .service('lineDetailsService', lineDetailsService);

  function lineDetailsService() {
    var lines = [
      {
        line: '145',
        destination: [
          {
            destinationName: 'Tuwima',
            busStops: ['Strzelców', 'Buraczana', 'Tuwima'],
            departure: [{
              index: 1,
              timetable: ['0705', '0709', '0721']
            },
              {
                index: 2,
                timetable: ['0735', '0739', '0751']
              },
              {
                index: 3,
                timetable: ['0805', '0809', '0821']
              },
              {
                index: 4,
                timetable: ['0835', '0839', '0851']
              },
              {
                index: 5,
                timetable: ['0905', '0909', '0921']
              }
            ]
          },
          {
            destinationName: 'Strzelców',
            busStops: ['Tuwima', 'Buraczana', 'Strzelców'],
            departure: [{
              index: 1,
              timetable: ['0721', '0728', '0732']
            },
              {
                index: 2,
                timetable: ['0751', '0758', '0802']
              },
              {
                index: 3,
                timetable: ['0821', '0828', '0832']
              },
              {
                index: 4,
                timetable: ['0851', '0858', '0902']
              },
              {
                index: 5,
                timetable: ['0921', '0928', '0932']
              }
            ]
          }
        ]
      }
    ];

    this.getLinesDetails = function () {
      return lines;
    }
  }
})();