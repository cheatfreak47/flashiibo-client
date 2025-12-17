const { app, BrowserWindow, screen } = require('electron')
const path = require('path')
let mainWindow
app.commandLine.appendSwitch('enable-experimental-web-platform-features')
app.commandLine.appendSwitch('enable-web-bluetooth')

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width: Math.max(1000, Math.floor(width * 0.8)), 
    height: Math.max(600, Math.floor(height * 0.9)),
    minWidth: 1000,
    minHeight: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableBluetooth: true,
      worldSafeExecuteJavaScript: true,
      webSecurity: true,
	  preload: path.join(__dirname, 'preload.js')
    }
  })

  // ===== BLUETOOTH HANDLER =====
  mainWindow.webContents.on('select-bluetooth-device', (event, devices, callback) => {
    event.preventDefault()
    const device = devices.find(d => d.deviceName?.toLowerCase().includes('flashiibo'))
    device ? callback(device.deviceId) : setTimeout(() => callback(''), 1000)
  })

  mainWindow.loadURL('https://app.flashiibo.com/')
  mainWindow.setPosition(
    Math.floor((width - mainWindow.getSize()[0]) / 2),
    Math.floor((height - mainWindow.getSize()[1]) / 2)
  )
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

