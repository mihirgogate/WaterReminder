var app = require('app');
var Tray = require('tray');
var Menu = require('menu');
var path = require('path');
var BrowserWindow = require('browser-window');
var util = require('util');
var lib = require('./lib')

var appIcon = null;
var win = null;

function getFullImagePath(imageFilePath) {
    return path.join(__dirname, imageFilePath);
}

function getEpoch() {
    return (new Date()).getTime() / 1000;
}

function getConfig(){
    return {
        "STEADY_STATE_IMAGE_PATH": "images/green.png",
        "UNSTEADY_STATE_IMAGE_PATH": "images/red.png",
        "NUM_SECONDS_BETWEEN_REMINDER": 3600,
        "REMINDER_FLASH_INTERVAL_IN_MS": 200,
        "REMINDER_COMPLETE_IMAGE_PATH": "images/water.png",
        "REMINDER_COMPLETE_TEXT": "Drank!",
        "TOOL_TIP_TEXT": "Drink Water",
        "QUIT_TEXT": "Quit"
    };
}

app.on('ready', function(){
  var timestampOfLastDrink = null;
  var config = getConfig();
  var appIcon = new Tray(
    getFullImagePath(config['STEADY_STATE_IMAGE_PATH'])
  );
  var contextMenu = Menu.buildFromTemplate([
      {
      label: config['REMINDER_COMPLETE_TEXT'],
      type: 'normal',
      icon: getFullImagePath(config['REMINDER_COMPLETE_IMAGE_PATH']),
      click: function() {
          timestampOfLastDrink = getEpoch();
      }
      },
      { label: config['QUIT_TEXT'],
      accelerator: 'Command+Q',
      selector: 'terminate:',
      }
  ]);
  appIcon.setToolTip(config['TOOL_TIP_TEXT']);
  appIcon.setContextMenu(contextMenu);
  var beeper = lib.Beeper({
    beep: function() {
        appIcon.setImage(
          getFullImagePath(config['UNSTEADY_STATE_IMAGE_PATH'])
        );
    },
    boop: function() {
        appIcon.setImage(
          getFullImagePath(config['STEADY_STATE_IMAGE_PATH'])
        );
    }
  });
  setInterval(function() {
    if (lib.shouldToggle(timestampOfLastDrink, getEpoch(), config['NUM_SECONDS_BETWEEN_REMINDER'])) {
        beeper.toggle();
    } else {
        beeper.steady();
    }
  }, config['REMINDER_FLASH_INTERVAL_IN_MS']);
});
