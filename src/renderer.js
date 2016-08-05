const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const cfg = require('../config/electron.config.js');
const { ipcRenderer } = require('electron');
const { app, nativeImage, Tray, Menu } = require('electron').remote;

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg); // prints "pong"
})

ipcRenderer.send('asynchronous-message', 'ping')

ipcRenderer.on('loaded' , function(event, data) {
  document.getElementById('title').innerHTML = data.appName + ' App';
  document.getElementById('details').innerHTML = 'built with Electron v' + data.electronVersion;
  document.getElementById('versions').innerHTML = 'running on Node v' + data.nodeVersion + ' and Chromium v' + data.chromiumVersion;
});

/*let trayimage = nativeImage.createFromDataURL(__dirname + '/icon/png/16x16.png');

let tray = new Tray(trayimage);

let contextMenu = Menu.buildFromTemplate([
  { label: 'Item1', type: 'radio' },
  { label: 'Item2', type: 'radio' },
  { label: 'Item3', type: 'radio' },
  { label: 'Check for Update', key: 'checkForUpdate', click: function () { require('electron').autoUpdater.checkForUpdates() } },
  { type: 'separator' },
  { label: 'Quit', accelerator: 'Command+Q', click: function () { app.quit() } }
]);

tray.setToolTip('This is my application.');
tray.setContextMenu(contextMenu);*/

function node() { 
  let xhr = new XMLHttpRequest();

  xhr.open('GET', cfg.remoteUrl + cfg.device);

  xhr.onreadystatechange = function() {

  if(xhr.readyState === 4 && xhr.status === 200) {
      let type = xhr.getResponseHeader('Content-Type');
      if(type === 'application/json') {
        let response = xhr.responseText;
        console.log(JSON.parse(response));
        sessionStorage.setItem('node', response);
      }
    }
  };

  xhr.send(null);
}

setInterval(node, 60 * 1000 * 30);
setInterval(checkConnection, 60 * 1000 * 5);

function checkConnection() {
  let xhr = new XMLHttpRequest();

  var data = sessionStorage.getItem('node');

  if (data) {
    data = JSON.parse(data);

    let url = 'http://' + data.remote.local_ip + ':' + cfg.port + '/api/status';

    xhr.open('GET', url);

    xhr.onreadystatechange = function() {

    if(xhr.readyState === 4 && xhr.status === 200) {
        let response = xhr.responseText;
        console.log(JSON.parse(response));
        sessionStorage.setItem('state', response);
        localStorage.setItem('device', 'http://' + data.remote.local_ip + ':' + cfg.port);
      }
    };

    xhr.send(null);
  }
}

node();
