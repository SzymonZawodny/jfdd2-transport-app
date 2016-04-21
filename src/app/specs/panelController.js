QUnit.module('Panel controller',{
  beforeEach: function() {
    this.mockScope = {};

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

    this.log = {
      info: function () {
      },
      warn: function () {
      }
    };

    this.panelController = panelController
    (this.mockScope, this.busStopService, this.lineDetailsService, this.log)

  }
});

QUnit.test('Changing tabs', function(assert) {

  this.mockScope.selectTab(1);
  assert.equal(this.mockScope.tab,1,'Changing tab with "1" parameter - done');

  this.mockScope.selectTab(0);
  assert.equal(this.mockScope.tab,1,'Changing tab with "0" parameter, tab stays with "1" - done');

  this.mockScope.selectTab(4);
  assert.equal(this.mockScope.tab,4,'Changing tab with "4" parameter, tab switches to "4" - done');

  this.mockScope.selectTab(5);
  assert.equal(this.mockScope.tab,1,'Changing tab with "5" parameter (out of tabs range), tab stays with "1" - done');

  this.mockScope.readSelectedBusStop('name');
  assert.equal(this.mockScope.tab,1, "Switching to tab 1 when reading selected bus stop");

  this.mockScope.readSelectedLine('name');
  assert.equal(this.mockScope.tab,2, "Switching to tab 2 when reading selected bus line");

});

QUnit.test('Filtering bus stop details', function(assert) {
  this.mockScope.changeBusStopDetail('non-existing name');
  assert.deepEqual(this.mockScope.busStop, undefined, 'Bus stops filtered by non-existing bus stop name -  result = undefined');

  this.mockScope.changeBusStopDetail('');
  assert.deepEqual(this.mockScope.busStop, undefined, 'Bus stops filtered by empty bus stop name -  result = undefined');
});


