const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const config = require('./config.json');

app.disableHardwareAcceleration();
const windows = [];
let currentID = 0;

function createWindow () {
  for (let i = 0; i < 2; i += 1) {
    const win = new BrowserWindow({
      backgroundColor: "rgb(0, 0,0)",
      fullscreen: false,
      autoHideMenuBar: true,
      width: 400,
      height: 400,
      x: config.windows[i].x,
      y: config.windows[i].y,
      webPreferences: {
          // allowRunningInsecureContent: true,
          // experimentalFeatures: true,
          nodeIntegration: true,
          contextIsolation: true,
          enableRemoteModule: true,
          preload: path.resolve(app.getAppPath(), 'preload.js')
      }
    })

    win.loadFile('index.html')
    win.setBackgroundColor("rgb(0, 0, 0)");
    win.webContents.openDevTools()

    win.webContents.once('dom-ready', () => {
      win.webContents.send('init', i);
    });

    windows.push(win);
  }
}

ipcMain.on('action', (event, actionType) => {
  console.log('action', actionType);
  switch (actionType) {
    case 'next':
      if (currentID < config.images.length - 1) {
        currentID += 1;
      }
      break;
    case 'prev':
      if (currentID > 0) {
        currentID -= 1;
      }
      break;
    case 'reset':
      currentID = 0;
      break;
    default:
      break;
  }

  windows.forEach((win) => {
    win.webContents.send('update', currentID);
  });
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})