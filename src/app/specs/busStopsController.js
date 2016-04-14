QUnit.module('Bus stops controller',{
  beforeEach: function() {
    this.mockScope = {};
    this.uibModal = {
      open: function(){}
    };
    this.busStopService = {
      stops: [
        {
          name: 'Buraczana',
          bus: [
            {
              line: '145',
              destination: 'Tuwima',
              departures: ['0709', '0739', '0809', '0839', '0909',
                '0939', '1009', '1039', '1109', '1139', '1209', '1239', '1309',
                '1339', '1409', '1439', '1509', '1539', '1609', '1639', '1709', '1739',
                '1809', '1839', '1909', '1939', '2009']
            }
          ]
        },
        {
          name: 'Gdańska',
          bus: [
            {
              line: '153',
              destination: 'Fiołkowa',
              departures: ['0808', '0838', '1036', '1124', '1239', '1347', '1424',
                '1532', '1634', '1755']
            }
          ]
        }
      ],
      getStops: function () {
        return this.stops;
      }
    };
    this.lineDetailsService = {
      lines: [
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
        }
      ],

      getLinesDetails: function () {
        return this.lines;
      }
    };

    this.busStopsController = busStopsController
      (this.mockScope, this.busStopService, this.uibModal, this.lineDetailsService)
  }
  });


QUnit.test('Filtrowanie danych', function(assert) {
  this.mockScope.showBusStopDetail('Buraczana');
  assert.equal(this.mockScope.busStop,'Buraczana','Przefiltrowano przystanki po nazwie przystanku');

  this.mockScope.getDetails('145', 'Tuwima', '0706', 'Grenadierów', 1);
  assert.equal(this.mockScope.selectedBusStopIndex,1,'Odczyt indeksu wybranego odjazdu z tablicy wszystkich odjazdów');

  this.mockScope.getDetails('145', 'Tuwima', '0706', 'Grenadierów', 1);
  assert.deepEqual(this.mockScope.pastBusStops
    ,["Strzelców"]
    ,'Stworzenie tablicy "przeszłych" przystanków');

  this.mockScope.getDetails('145', 'Tuwima', '0706', 'Grenadierów', 1);
  assert.deepEqual(this.mockScope.remainingBusStops
    ,['Grenadierów', 'Buraczana', 'Nałkowskiej', 'Źródło Marii', 'Brzechwy', 'Tuwima']
    ,'Stworzenie tablicy "przyszłych" przystanków');

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
    ,'Odczyt godzin odjazdu konkretnego przejazdu autobusu');
  debugger;
});

