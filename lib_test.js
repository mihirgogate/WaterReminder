var test = require('cached-tape');
var lib = require('./lib');

test('shouldToggle returns true if timestampOfLastDrink is null', function(t) {
    t.equals(lib.shouldToggle(null, 0, 0), true);
    t.end();
});

test('shouldToggle returns false', function(t) {
    t.equals(lib.shouldToggle(1, 2, 1), false);
    t.end();
});

test('shouldToggle returns false', function(t) {
    t.equals(lib.shouldToggle(1, 3, 1), true);
    t.end();
});


test('Beeper toggle makes it not steady', function(t) {
    function noop() {
    }
    var b = lib.Beeper({
        beep: noop,
        boop: noop
    })
    b.toggle();
    t.equals(b.isSteady(), false);
    t.end();
});

test('Beeper starts of as steady', function(t) {
    function noop() {
    }
    var b = lib.Beeper({
        beep: noop,
        boop: noop
    })
    t.equals(b.isSteady(), true);
    t.end();
});

test('Beeper becomes steady regardless of state', function(t) {
    function noop() {
    }
    var b = lib.Beeper({
        beep: noop,
        boop: noop
    })
    b.toggle();
    b.steady();
    t.equals(b.isSteady(), true);
    t.end();
});


test('Toggling Beeper when steady calls beep', function(t) {
    var beepIsCalled = false;
    var boopIsCalled = false;
    function beepCallback() {
      beepIsCalled = true;
    }
    function boopCallback() {
      boopIsCalled = true;
    }
    var b = lib.Beeper({
        beep: beepCallback,
        boop: boopCallback
    })
    b.steady();
    b.toggle();
    t.equals(beepIsCalled, true);
    t.equals(boopIsCalled, false);
    t.end();
});

test('Toggling Beeper when not steady calls boop', function(t) {
    var beepIsCalled = false;
    var boopIsCalled = false;
    function beepCallback() {
      beepIsCalled = true;
    }
    function boopCallback() {
      boopIsCalled = true;
    }
    var b = lib.Beeper({
        beep: beepCallback,
        boop: boopCallback
    })
    b.steady();
    b.toggle();

    // Ignore calls so far as we only care about the test case in question
    beepIsCalled = false;
    boopIsCalled = false;

    b.toggle();
    t.equals(boopIsCalled, true);
    t.equals(beepIsCalled, false);
    t.end();
});


test('Making Beeper steady when its not calls boop', function(t) {
    var beepIsCalled = false;
    var boopIsCalled = false;
    function beepCallback() {
      beepIsCalled = true;
    }
    function boopCallback() {
      boopIsCalled = true;
    }
    var b = lib.Beeper({
        beep: beepCallback,
        boop: boopCallback
    })
    b.steady();
    b.toggle();

    // Ignore calls so far as we only care about the test case in question
    beepIsCalled = false;
    boopIsCalled = false;

    b.steady();
    t.equals(boopIsCalled, true);
    t.equals(beepIsCalled, false);
    t.end();
});

test('Making Beeper steady when it already is calls neither beep nor boop', function(t) {
    var beepIsCalled = false;
    var boopIsCalled = false;
    function beepCallback() {
      beepIsCalled = true;
    }
    function boopCallback() {
      boopIsCalled = true;
    }
    var b = lib.Beeper({
        beep: beepCallback,
        boop: boopCallback
    })
    b.steady();
    t.equals(boopIsCalled, false);
    t.equals(beepIsCalled, false);
    t.end();
});
