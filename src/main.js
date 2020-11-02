require('./main/services/_services.ipc');
const { app, BrowserWindow } = require('electron');
const environmentService = require('./main/services/environment.service');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      additionalArguments: [`--DEV=${environmentService.isDevMode()}`]
    }
  })
  
  win.loadFile('src/index.html')
  win.once('ready-to-show', () => {
    win.show()
    win.webContents.openDevTools()
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})