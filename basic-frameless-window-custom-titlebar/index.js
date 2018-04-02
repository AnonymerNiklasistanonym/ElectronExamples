// imports
const {
  shell,
  remote
} = require('electron')

/**
 * Open a given URL externally in the default browser
 * @param {String} url - Normal URL
 */
function openLinkExternally(url) {
  shell.openExternal(url)
}

const titlebar = document.getElementById("titlebar-windows-10")
console.log(titlebar)
const titlebarSettings = document.getElementById("titelbar-settings")
const titlebarHelp = document.getElementById("titelbar-help")
const titlebarMinimize = document.getElementById("titelbar-minimize")
const titlebarResize = document.getElementById("titelbar-resize")
const titlebarClose = document.getElementById("titelbar-close")

titlebarSettings.addEventListener("click", () => {
  console.log("settings was clicked")
})
titlebarHelp.addEventListener("click", () => {
  console.log("help was clicked")
})
titlebarMinimize.addEventListener("click", () => {
  console.log("minimize was clicked")
  remote.getCurrentWindow().minimize()
})
titlebarResize.addEventListener("click", () => {
  console.log("resize was clicked")
  if (remote.getCurrentWindow().isMaximized()) {
    remote.getCurrentWindow().restore()
  } else remote.getCurrentWindow().maximize()
})
titlebarClose.addEventListener("click", () => {
  console.log("close was clicked")
  remote.getCurrentWindow().close()
})

document.addEventListener("keyup", e => {
  switch (e.which) {
    case 122: // F11 - Fullscreen
      remote
        .getCurrentWindow()
        .setFullScreen(!remote.getCurrentWindow().isFullScreen())
      break
  }
})

// event listener for dev shortcuts
document.addEventListener('keydown', e => {
  switch (e.which) {
    case 116: // F5
      remote.getCurrentWindow().reload()
      break
    case 123: // F12
      remote.getCurrentWindow().toggleDevTools()
  }
})

// if window is maximized add class to titlebar for new icon and otherwise
remote.getCurrentWindow().on('maximize', () => {
  titlebar.classList.add('fullscreen')
})
remote.getCurrentWindow().on('unmaximize', () => {
  titlebar.classList.remove('fullscreen')
})

// if full screen is activated hide windows title bar and otherwise
remote.getCurrentWindow().on('enter-full-screen', () => {
  titlebar.style.display = 'none'
})
remote.getCurrentWindow().on('leave-full-screen', () => {
  titlebar.style.display = 'block'
})
