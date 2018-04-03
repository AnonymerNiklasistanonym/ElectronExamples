# ElectronExamples

Example Electron apps

## Electron docs/api

https://github.com/electron/electron/tree/master/docs/api

## What is an Electron project

### Structure

Every Electron project consist out of at least these files in one directory:

- package.json (program info, metadata)
- main.js (main loop)
- index.html (visual interface)

But you can add yourself an infinite number of pictures, other websites/interfaces and scripts.

## How to edit/create/run an Electron package

Every file can be edited with a normal text editor, but to run it and build it you need a terminal that is in the current directory of your project.
If you want therfore an all in one solution you can use a text editor with an integrated terminal like [VS Code Insiders](https://code.visualstudio.com/insiders/).

### Create

First you need to install Node.js from [here](https://nodejs.org/en/).

Then you run the following command to initalize a new directory and a `package.json` file for your project:

```bash
npm init
```

The new created `package.json` file should look like this:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "node ."
  }
}
```

To convert this to a electron application you just need to rename the start script from `node` to `electron`:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

*It is important, that the lines `"main": "main.js"` and `"start": "electron ."` are exactly as in the last code snippet.*

Then you also need to install and add the node module electron package to your project:

```bash
npm install --save-dev electron
```

Now you need to create a [`main.js`](basic-template/main.js) template file (copied form [here](https://github.com/electron/electron/blob/master/docs/tutorial/first-app.md)):

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```

And a [`index.html`](basic-template/index.html) file:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Hello World!</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        We are using node <script>document.write(process.versions.node)</script>,
        Chrome <script>document.write(process.versions.chrome)</script>,
        and Electron <script>document.write(process.versions.electron)</script>.
    </body>
</html>
```

### Run

For starters you need to install everything that is in the `package.json` file (you only need to do this once) (again copied form [here](https://github.com/electron/electron/blob/master/docs/tutorial/first-app.md)):

```bash
npm install
```

Then you need only one command to start the application:

```bash
npm start
```

## How to export Electron projects

To export Electron projects there are many ways, here are two of them:

### `electron-builder` (recommended)

1. On the newer version of Node this package is already installed and therfore can be called via

   ```bash
   npx electron-builder .
   ```

2. Use as additional command the following to export to your desired plattform: `--win` for Windows export (.exe and unpacked files), then there is `--linux` and `--mac`. To learn more about the options look them up on [this website](https://www.electron.build/cli).

   ```bash
   npx electron-builder . --win
   ```

#### Additional build data

To get something like an icon for the installer you can sepcify additional data in the `package.json` file under `"build"` (you need to add it yourself):

```json
{
...,
"build": {
    "appId": "little-shutdown-program",
    "win": {
      "icon": "icon.ico"
    }
  }
}
```

With new properties like `"win"` `"icon"` you can add an icon to the windows build.

## Nice things to know

### Update a package

To simply update all modules run `npm update`

To view if any module has a new version run `npm outdated`

If you use Visual Studio Code as code editor you can also simply install the extension [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens) and then open the package.json file to view if there are any updates and with just one click update them.

### Update a global package

For example the `electron` module you installed months ago won't update itself - but with the following command you can update it:

``` bash
npm update -g electron
```

If you just write `npm update -g` all global packages will be updated and `npm outdated -g` works too.

### Communication problems

Because you can for example only popup native message boxes in the main process or only access the `electron.app` functions or relaunch the app or ... you need to communicate between the both JavaScript files. This can easily be done with [these two electron modules](https://electronjs.org/docs/api/ipc-main#sending-messages):

You just need to place this in your `main.js` file:

``` JavaScript
// In main process.
const {ipcMain} = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.returnValue = 'pong'
})
```
  
  And this in your `index.js` file:
  
  ``` JavaScript
// In renderer process (web page).
const {ipcRenderer} = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
  ```
  
