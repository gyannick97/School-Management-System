'use strict'
import { app, BrowserWindow } from 'electron'
const path = require('path')

const { Menu, shell, dialog, ipcMain } = require('electron')
const moment = require('moment')

global.dbpath = path.join(app.getPath("userData"), "db.json");
global.ftpath = path.join(app.getPath("userData"), "FirstTime.json");

// var fs = require('fs');

// fs.readFile(path.join(app.getPath("userData"), "FirstTime.json"), 'utf8', function (err, contents) {
//   if (err) {
//     var obj = {
//       expDate: moment().add(15, 'days').toDate()
//     };
//     fs.writeFileSync(path.join(app.getPath("userData"), "FirstTime.json"), JSON.stringify(obj), 'utf8');
//     return;
//   }

//   contents = JSON.parse(contents)

//   if (moment(contents.expDate).isBefore(moment())) {
//     fs.unlink(path.join(app.getPath("userData"), "db.json"), function(err) {
//       if(err) return console.log(err)
//       console.log('file deleted successfully')
//     })
//     app.exit()
//     return
//   }
// })

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    title: 'SMS',
    useContentSize: true,
    width: 1000,
    minHeight: 563,
    minWidth: 780
  })

  mainWindow.loadURL(winURL)
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('window-all-hide', () => {
  if (process.platform !== 'darwin') {
    app.hide()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// app.getLocale()

let template = [{
  label: 'Edit',
  submenu: [{
    label: 'Undo',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  }, {
    label: 'Redo',
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    label: 'Cut',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut'
  }, {
    label: 'Copy',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: 'Paste',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }, {
    label: 'Select all',
    accelerator: 'CmdOrCtrl+A',
    role: 'selectall'
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        // on reload, start fresh and close any old
        // open secondary windows
        if (focusedWindow.id === 1) {
          BrowserWindow.getAllWindows().forEach(win => {
            if (win.id > 1) win.close()
          })
        }
        focusedWindow.reload()
      }
    }
  }, {
    label: 'Full screen',
    accelerator: (() => {
      if (process.platform === 'darwin') {
        return 'Ctrl+Command+F'
      } else {
        return 'F11'
      }
    })(),
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      }
    }
  }]
}, {
  label: 'Window',
  role: 'window',
  submenu: [{
    label: 'Minimize',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: 'Close',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }]
}, {
  label: 'Help',
  role: 'help',
  submenu: [{
    label: 'Learn more',
    click: () => {
      shell.openExternal('')
    }
  }]
}]

// function addUpdateMenuItems (items, position) {
//   if (process.mas) return

//   const version = app.getVersion()
//   let updateItems = [{
//     label: `Version ${version}`,
//     enabled: false
//   }, {
//     label: 'Checking for Update',
//     enabled: false,
//     key: 'checkingForUpdate'
//   }, {
//     label: 'Check for Update',
//     visible: false,
//     key: 'checkForUpdate',
//     click: () => {
//       require('electron').autoUpdater.checkForUpdates()
//     }
//   }, {
//     label: 'Restart and Install Update',
//     enabled: true,
//     visible: false,
//     key: 'restartToUpdate',
//     click: () => {
//       require('electron').autoUpdater.quitAndInstall()
//     }
//   }]

//   items.splice.apply(items, [position, 0].concat(updateItems))
// }

function findReopenMenuItem () {
  const menu = Menu.getApplicationMenu()
  if (!menu) return

  let reopenMenuItem
  menu.items.forEach(item => {
    if (item.submenu) {
      item.submenu.items.forEach(item => {
        if (item.key === 'reopenMenuItem') {
          reopenMenuItem = item
        }
      })
    }
  })
  return reopenMenuItem
}

if (process.platform === 'darwin') {
  const name = app.getName()
  template.unshift({
    label: name,
    submenu: [{
      label: `About ${name}`,
      role: 'about'
    }, {
      type: 'separator'
    }, {
      label: 'Services',
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: `Hide ${name}`,
      accelerator: 'Command+H',
      role: 'hide'
    }, {
      label: 'Hide Others',
      accelerator: 'Command+Alt+H',
      role: 'hideothers'
    }, {
      label: 'Show All',
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      label: 'Quit',
      accelerator: 'Command+Q',
      click: () => {
        app.quit()
      }
    }]
  })

  // Window menu.
  template[3].submenu.push({
    type: 'separator'
  }, {
    label: 'Bring All to Front',
    role: 'front'
  })

  // addUpdateMenuItems(template[0].submenu, 1)
}

// if (process.platform === 'win32') {
//   const helpMenu = template[template.length - 1].submenu
//   addUpdateMenuItems(helpMenu, 0)
// }

app.on('ready', () => {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

app.on('browser-window-created', () => {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('window-all-closed', () => {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = true
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
