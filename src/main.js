const { app, BrowserWindow, ipcMain, Menu, shell, Tray } = require('electron');
const cfg = require('../config/electron.config');

let tray = null
let menu;
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

  tray = new Tray('./resources/icon/png/16.png');

  let contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio' },
    { label: 'Check for Update', key: 'checkForUpdate', click: function () { require('electron').autoUpdater.checkForUpdates() } },
    { type: 'separator' },
    { label: 'Quit', accelerator: 'Command+Q', click: function () { app.quit() } }
  ]);

  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);

  win = new BrowserWindow({
    show: false,
    backgroundColor: '#2e2c29',
    width: 800,
    height: 600
  });

  win.loadURL(`file://${__dirname}/index.html`);

  win.maximize();

  win.webContents.on('ready-to-show', () => {
    win.show();
    win.focus();
  });

  win.on('closed', () => {
    win = null;
    tray.destroy();
  });

  return win;
}
