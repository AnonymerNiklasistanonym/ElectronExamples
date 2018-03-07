# ElectronExamples

Example Electron apps

## How to edit Electron projects

Every Electron project consist out of at least these files in one directory:

- package.json
- main.js
- index.html

Every file can be edited with a normal text editor like [VS Code Insiders](https://code.visualstudio.com/insiders/).

## How to create Electron project

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

Then you also need to install and add the electron package to your project:

```bash
npm install --save electron
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

## How to run Electron projects

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

### `electron-builder`

1. On the newer version of Node this package is already installed and therfore can be called via

   ```bash
   npx electron-builder .
   ```

2. Use as additional command the following to export to your desired plattform: `--win` for Windows export (.exe and unpacked files), then there is `--linux` and `--mac`. To learn more about the options look them up on [this website](https://www.electron.build/cli).

   ```bash
   npx electron-builder . --win
   ```

### `electron-packager`

1. Install the package `electron-packager`

   ```bash
   npm install electron-packager -g
   ```

2. After restarting the console run the command

   ```bash 
   electron-packager . --platform=<platform>
   ```

   to export the project to a specific plattform or this command

   ```bash
   electron-packager . --all
   ```

   to export it for all supported plattforms (`darwin`, `linux`, `mas`, `win32`)

3. Now a new directory will be created based on the name of the app and the plattform which contains the files to run it on the specified plattform
