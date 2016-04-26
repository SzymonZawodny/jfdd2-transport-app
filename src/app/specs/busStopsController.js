QUnit.module('Bus stops controller',{
  beforeEach: function() {
    this.mockScope = {
      $watch: function () {},
      linesDetails: [
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
              }
            ]
          },
          {
            destinationName: 'Strzelców',
            busStops: ['Tuwima', 'Brzechwy', 'Źródło Marii', 'Buraczana', 'Grenadierów', 'Strzelców'],
            departure: [{
              index: 0,
              timetable: ['0721', '0722', '0724', '0726', '0730', '0732']
            },
              {
                index: 1,
                timetable: ['0751', '0752', '0754', '0756', '0800', '0802']
              }
            ]
          }
        ]
      }]
    };

    this.uibModal = {
      open: function(){}
    };

    this.log = {
      info: function () {
      },
      warn: function () {
      }
    };

    this.busStopsController = busStopsController
      (this.mockScope,this.uibModal, this.log)
  }
  });

QUnit.test('Filtering data from API', function(assert) {

  this.mockScope.getDetails('145', 'Tuwima', '0706', 'Grenadierów', 1);
  assert.equal(this.mockScope.selectedBusStopIndex,1,'Reading index of selected bus trip from the departures array - read');

  this.mockScope.getDetails('145', 'Tuwima', '0706', 'Grenadierów', 1);
  assert.deepEqual(this.mockScope.pastBusStops
    ,["Strzelców"]
    ,'Creating array of the "past" bus stops - created');

  this.mockScope.getDetails('145', 'Tuwima', '0706', 'Grenadierów', 1);
  assert.deepEqual(this.mockScope.remainingBusStops
    ,['Grenadierów', 'Buraczana', 'Nałkowskiej', 'Źródło Marii', 'Brzechwy', 'Tuwima']
    ,'Creating array of the "future" bus stops - created');

  this.mockScope.getDetails('145', 'Tuwima', '0706', 'Grenadierów', 1);
  assert.deepEqual(this.mockScope.timetable
    ,[{
        "index": 1,
        "timetable": [
          "0735",
          "0736",
          "0739",
          "0740",
          "0741",
          "0743",
          "0751"
        ]
      }
    ]
    ,'Reading timetable of a single/selected trip - read');
});

