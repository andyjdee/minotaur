const { crashReporter, app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

crashReporter.start({
  productName: 'Minotaur',
  companyName: 'Aveo Ltd',
  submitURL: 'https://tobecompleted.com/tbc-submit',
  uploadToServer: false,
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1140,
    height: 800,
    show: false,
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, 'public', 'index.html'),
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
