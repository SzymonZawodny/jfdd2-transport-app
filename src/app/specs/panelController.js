QUnit.module('Bus stops controller',{
  beforeEach: function() {
    this.mockScope = {};
    this.panelController = panelController(this.mockScope)
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
});

