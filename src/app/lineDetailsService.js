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
            busStops: ['Strzelców', 'Grenadierów', 'Buraczana','Nałkowskiej','Źródło Marii', 'Tuwima'],
            departure: [
              {
                index: 0,
                timetable: ['0705','0706','0709', '0710','0711', '0721']
              },
              {
                index: 1,
                timetable: ['0735','0736', '0739','0740','0741', '0751']
              },
              {
                index: 2,
                timetable: ['0805','0806', '0809','0810','0811', '0821']
              },
              {
                index: 3,
                timetable: ['0835','0836', '0839', '0840', '0841', '0851']
              },
              {
                index: 4,
                timetable: ['0905','0906', '0909', '0910', '0911', '0921']
              }
            ]
          },
          {
            destinationName: 'Strzelców',
            busStops: ['Tuwima', 'Buraczana', 'Strzelców'],
            departure: [{
              index: 0,
              timetable: ['0721', '0728', '0732']
            },
              {
                index: 1,
                timetable: ['0751', '0758', '0802']
              },
              {
                index: 2,
                timetable: ['0821', '0828', '0832']
              },
              {
                index: 3,
                timetable: ['0851', '0858', '0902']
              },
              {
                index: 4,
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