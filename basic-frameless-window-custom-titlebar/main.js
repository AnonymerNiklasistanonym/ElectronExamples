// Import modules
const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

// global variable for the main window
var mainWindow = null

// check if there is already an instance of this program running
const shouldQuit = app.makeSingleInstance(() => {
  // if there is a main window
  if (mainWindow) {
    // restore it if it's minimized
    if (mainWindow.isMinimized()) mainWindow.restore()
    // focus the already opened main window
    mainWindow.focus()
  }
})

// another instance of this program was found running
if (shouldQuit) {
  // quit this instance of the program
  app.quit()
}

/**
 * Create the main window
 */
function createWindow () {
  // Create a BrowserWindow object
  mainWindow = new BrowserWindow({
    title: 'little shutdown program',
    titleBarStyle: 'hidden',
    backgroundColor: '#c9329e',
    minWidth: 550,
    minHeight: 550,
    width: 550,
    height: 550,
    x: 0,
    y: 0,
    frame: false,
    fullscreen: false,
    show: false,
    icon: path.join(__dirname, 'icon.ico'),
    center: true
  })

  // Load the 'index.html' file in the window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  )

  // Uncomment for instant debugging (from start open dev tools)
  // mainWindow.webContents.openDevTools()

  // The renderer process has rendered the page for the first time
  mainWindow.on('ready-to-show', () => {
    // show window
    mainWindow.show()
    // focus window
    mainWindow.focus()
  })

  // Window was closed
  mainWindow.on('closed', () => {
    // Dereference the window object
    mainWindow = null
  })
}

// Electron is finished initializing and ready to create browser windows
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // macOS: Applications keep their menu bar until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // macOS: Re-create a window in the app when the dock icon is clicked and there are no other open windows
  if (mainWindow === null) createWindow()
})
