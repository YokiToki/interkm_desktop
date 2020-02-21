const {app, BrowserWindow} = require('electron');

if (process.env.NODE_ENV === 'development') {
    const reload = require('electron-reload');
    reload(`${__dirname}/app/`)
}

let mainWindow;

function createWindow() {
    let appPath = __dirname;
    mainWindow = new BrowserWindow({
        width: 700,
        height: 495,
        webPreferences: {
            nodeIntegration: true
        }
    });

    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.loadURL(`file://${appPath}/app/index.html`);

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}


if (process.env.NODE_ENV === 'development') {
    app.commandLine.appendSwitch('remote-debugging-port', '9229')
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});
