const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const cfg = require('../config/electron.config');

require('electron').ipcRenderer.on('loaded' , function(event, data) {
  document.getElementById('title').innerHTML = data.appName + ' App';
  document.getElementById('details').innerHTML = 'built with Electron v' + data.electronVersion;
  document.getElementById('versions').innerHTML = 'running on Node v' + data.nodeVersion + ' and Chromium v' + data.chromiumVersion;
});

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

  let data = JSON.parse(sessionStorage.getItem('node'));

  if (data) {
    let url = 'http://' + data.remote.local_ip + ':' + cfg.port + '/api/status';

    xhr.open('GET', url);

    xhr.onreadystatechange = function() {

    if(xhr.readyState === 4 && xhr.status === 200) {
        let response = xhr.responseText;
        console.log(JSON.parse(response));
        localStorage.setItem('status', response);
      }
    };

    xhr.send(null);
  };
}

node();
