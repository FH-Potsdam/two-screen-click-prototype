const { contextBridge, ipcRenderer } = require('electron')
const config = require('./config.json')
const path = require('path')

contextBridge.exposeInMainWorld('electronAPI', {
  action: (actionType) => ipcRenderer.send('action', actionType),
  init: (callback) => ipcRenderer.on('init', callback),
  update: (callback) => ipcRenderer.on('update', callback),
  config,
  path: path.join(__dirname, 'assets')
})
