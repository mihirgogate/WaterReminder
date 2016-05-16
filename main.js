var app = require('app');
var Tray = require('tray');
var Menu = require('menu');
var path = require('path');
var BrowserWindow = require('browser-window');
var util = require('util');

var iconPath = getImagePath('green.png');
var appIcon = null;
var win = null;

function getImagePath(imageFileName) {
    return path.join(__dirname, 'images/' + imageFileName);
}

app.on('ready', function(){
  var action = 0;
  var appIcon = new Tray(iconPath);
  setInterval(function() {
    if (action == 0) {
        appIcon.setImage(getImagePath('red.png'));
        action = 1;
    } else if (action == 1) {
        appIcon.setImage(getImagePath('green.png'));
        action = 0;
    }
  }, 200);
  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'Drank!',
      type: 'normal',
      icon: getImagePath('water.png'),
      click: function(e) {
        action = 3;
        console.log(e);
      }
    },
    { label: 'Quit',
      accelerator: 'Command+Q',
      selector: 'terminate:',
    }
  ]);
  appIcon.setToolTip('Drink Water');
  appIcon.setContextMenu(contextMenu);
});
