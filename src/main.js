const { app, BrowserWindow, ipcMain } = require('electron')
const cfg = require('../config/private.config.js')
const is = require('electron-is')
console.log(is.main())

let mainWindow = null;

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
event.sender.send('asynchronous-reply', 'pong')
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
  app.quit();
}
});

if (cfg.env === 'development') {
  require('electron-debug')({
    showDevTools: 'bottom'
  });
}

app.on('ready', () => {
  mainWindow = createWindow();
});

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createWindow();
  }
});

function createWindow() {

  win = new BrowserWindow({
    show: false,
    backgroundColor: '#2e2c29',
    width: 800,
    height: 600
  });

  win.loadURL('file://' + __dirname + '/index.html');

  win.maximize();

  win.webContents.on('ready-to-show', () => {
    win.show();
    win.focus();
});

  win.on('closed', () => {
    win = null;
});

  return win;
}