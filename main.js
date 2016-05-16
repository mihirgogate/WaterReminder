var app = require('app');
var Tray = require('tray');
var Menu = require('menu');
var path = require('path');
var BrowserWindow = require('browser-window');
var util = require('util');

var appIcon = null;
var win = null;

function getImagePath(imageFileName) {
    return path.join(__dirname, 'images/' + imageFileName);
}

function shouldToggle(timestampOfLastDrink, currentTimestamp, secondsToWait) {
    if (timestampOfLastDrink === null) {
        return true;
    }
    if ((currentTimestamp - timestampOfLastDrink) > secondsToWait) {
        return true;
    } else {
        return false;
    }
}

function Beeper(beeperStopCallback) {
    var STEADY_STATE = 0;
    var state = STEADY_STATE;
    var iconPath = getImagePath('green.png');
    var appIcon = new Tray(iconPath);
    var contextMenu = Menu.buildFromTemplate([
        {
        label: 'Drank!',
        type: 'normal',
        icon: getImagePath('water.png'),
        click: beeperStopCallback,
        },
        { label: 'Quit',
        accelerator: 'Command+Q',
        selector: 'terminate:',
        }
    ]);
    appIcon.setToolTip('Drink Water');
    appIcon.setContextMenu(contextMenu);
    return {
        toggle: function() {
            if (state == 0) {
                state = 1;
                appIcon.setImage(getImagePath('red.png'));
            } else {
                state = 0;
                appIcon.setImage(getImagePath('green.png'));
            }
        },
        steady: function() {
            if (state == 1) {
                state = 0;
                appIcon.setImage(getImagePath('green.png'));
            }
        }
    }
}

function getEpoch() {
    return (new Date()).getTime() / 1000;
}

app.on('ready', function(){
  var timestampOfLastDrink = null;
  var beeper = Beeper(function() {
    timestampOfLastDrink = getEpoch();
  });
  setInterval(function() {
    if (shouldToggle(timestampOfLastDrink, getEpoch(), 3600)) {
        beeper.toggle();
    } else {
        beeper.steady();
    }
  }, 200);
});
