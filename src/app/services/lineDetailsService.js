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
            busStops: ['Strzelców', 'Grenadierów', 'Buraczana', 'Nałkowskiej', 'Źródło Marii', 'Brzechwy', 'Tuwima'],
            departure: [
              {
                index: 0,
                timetable: ['0705', '0706', '0709', '0710', '0711', '0713', '0721']
              },
              {
                index: 1,
                timetable: ['0735', '0736', '0739', '0740', '0741', '0743', '0751']
              },
              {
                index: 2,
                timetable: ['0805', '0806', '0809', '0810', '0811', '0813', '0821']
              },
              {
                index: 3,
                timetable: ['0835', '0836', '0839', '0840', '0841', '0843', '0851']
              },
              {
                index: 4,
                timetable: ['0905', '0906', '0909', '0910', '0911', '0913', '0921']
              }
            ]
          },
          {
            destinationName: 'Strzelców',
            busStops: ['Tuwima', 'Brzechwy', 'Źródło Marii', 'Buraczana',  'Grenadierów','Strzelców'],
            departure: [{
              index: 0,
              timetable: ['0721','0722','0724', '0726', '0730', '0732']
            },
              {
                index: 1,
                timetable: ['0751','0752','0754', '0756','0800', '0802']
              },
              {
                index: 2,
                timetable: ['0821','0822','0824', '0826','0830', '0832']
              },
              {
                index: 3,
                timetable: ['0851','0852','0854', '0856', '0900', '0902']
              },
              {
                index: 4,
                timetable: ['0921','0922','0924', '0926', '0930', '0932']
              }
            ]
          }
        ]
      },
      {
        line: '160',
        destination: [
          {
            destinationName: 'Tuwima',
            busStops: ['Strzelców', 'Grenadierów', 'Fiołkowa', 'Nałkowskiej', 'Źródło Marii', 'Brzechwy', 'Tuwima'],
            departure: [
              {
                index: 0,
                timetable: ['0705', '0706', '0709', '0710', '0711', '0713', '0721']
              },
              {
                index: 1,
                timetable: ['0735', '0736', '0739', '0740', '0741', '0743', '0751']
              },
              {
                index: 2,
                timetable: ['0805', '0806', '0809', '0810', '0811', '0813', '0821']
              },
              {
                index: 3,
                timetable: ['0835', '0836', '0839', '0840', '0841', '0843', '0851']
              },
              {
                index: 4,
                timetable: ['0905', '0906', '0909', '0910', '0911', '0913', '0921']
              }
            ]
          },
          {
            destinationName: 'Strzelców',
            busStops: ['Tuwima', 'Brzechwy', 'Źródło Marii', 'Buraczana',  'Grenadierów','Strzelców'],
            departure: [{
              index: 0,
              timetable: ['0721','0722','0724', '0726', '0730', '0732']
            },
              {
                index: 1,
                timetable: ['0751','0752','0754', '0756','0800', '0802']
              },
              {
                index: 2,
                timetable: ['0821','0822','0824', '0826','0830', '0832']
              },
              {
                index: 3,
                timetable: ['0851','0852','0854', '0856', '0900', '0902']
              },
              {
                index: 4,
                timetable: ['0921','0922','0924', '0926', '0930', '0932']
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