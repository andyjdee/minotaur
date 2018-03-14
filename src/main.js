const { nativeImage, app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const appIcon = nativeImage.createFromPath(
  path.join(__dirname, '/../build/img/logo-symbol.png')
);
const indexPage = path.join(__dirname, '/../build/index.html');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ 
    width: 800,
    height: 600,
    icon: appIcon
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: indexPage,
    protocol: 'file:',
    slashes: true,
  });
  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
