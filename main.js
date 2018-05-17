const {app, BrowserWindow} = require('electron')

const path = require('path')
const url = require('url')

function createWindow () {
    // Create the browser window.
    let win = new BrowserWindow({width: 800, height: 600})

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.on('closed', function () {
        win = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})