const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let applicationPathname = path.join(__dirname, 'index.html')
let applicationProtocol = 'file:'
let applicationSlashes = true
let background = '#FFFFFF'

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600, 
    title: "Sample Application",
    transparent: true,
    backgroundColor: background,
    webPreferences: {
        nodeIntegration: true   
    }
  })

  mainWindow.loadURL(url.format({
    pathname: applicationPathname,
    protocol: applicationProtocol,
    slashes: applicationSlashes
  }))
  
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
