QUnit.module('Favourites controller',{
  beforeEach: function() {
    this.mockScope = {};
    this.uibModal = {
      open: function(){}
    };
    this.localStorageService = {
      get: function(){},
      set: function(){}
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

    this.favouritesCtrl = favouritesCtrl
    (this.mockScope, this.localStorageService, this.busStopService, this.lineDetailsService, this.uibModal)
  }
});

QUnit.test('Most popular bus stops', function(assert) {

  this.mockScope.sort([{name:"Przystanek 1", count:1},{name: "Przystanek 2", count:2}]);
  assert.deepEqual(this.mockScope.result,
    [
    {
      "count": 2,
      "name": "Przystanek 2"
    },
    {
      "count": 1,
      "name": "Przystanek 1"
    }
    ], 'Sorting most popular bus stops by likes (descending) - sorted');

  this.mockScope.newBusStopObject("Przystanek 1", 2, 3);
  assert.notDeepEqual(this.mockScope.newBusStopObjectInstance,
    {
      "count": 2,
      "name": "Przystanek 1"
    }, "Creating new bus stop object with TWO arguments ('name', count') - created");

  this.mockScope.newBusStopObject("Przystanek 1", 2, 3);
  assert.notDeepEqual(this.mockScope.newBusStopObjectInstance,
    {
      "count": 2,
      "name": "Przystanek 1"
    }, "Creating new bus stop object with THREE OR MORE arguments - created");

  this.mockScope.newBusStopObject();
  assert.deepEqual(this.mockScope.newBusStopObjectInstance,
    {}, "Creating new bus stop object with NO arguments - no object created");

  this.mockScope.uniqueLines();
  assert.deepEqual(this.mockScope.newBusStopObjectInstance,
    {}, "Creating new bus stop object with SPACE in name argument - no object created");

  this.mockScope.updateFavouriteBusStops();
  assert.deepEqual(this.mockScope.mostPopularBusStops,
    {}, "Reading most popular bus stops from local storage")


});

