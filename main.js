var app = require('app');
var Tray = require('tray');
var Menu = require('menu');
var path = require('path');
var BrowserWindow = require('browser-window');
var util = require('util');
var lib = require('./lib')

var NUM_SECONDS_BETWEEN_REMINDER = 3600;
var appIcon = null;
var win = null;

function getImagePath(imageFileName) {
    return path.join(__dirname, 'images/' + imageFileName);
}

function getEpoch() {
    return (new Date()).getTime() / 1000;
}

app.on('ready', function(){
  var timestampOfLastDrink = null;
  var appIcon = new Tray(getImagePath('green.png'));
  var contextMenu = Menu.buildFromTemplate([
      {
      label: 'Drank!',
      type: 'normal',
      icon: getImagePath('water.png'),
      click: function() {
          timestampOfLastDrink = getEpoch();
      }
      },
      { label: 'Quit',
      accelerator: 'Command+Q',
      selector: 'terminate:',
      }
  ]);
  appIcon.setToolTip('Drink Water');
  appIcon.setContextMenu(contextMenu);
  var beeper = lib.Beeper({
    beep: function() {
        appIcon.setImage(getImagePath('red.png'));
    },
    boop: function() {
        appIcon.setImage(getImagePath('green.png'));
    }
  });
  setInterval(function() {
    if (lib.shouldToggle(timestampOfLastDrink, getEpoch(), NUM_SECONDS_BETWEEN_REMINDER)) {
        beeper.toggle();
    } else {
        beeper.steady();
    }
  }, 200);
});
