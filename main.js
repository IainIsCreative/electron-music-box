const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const path = require('path');

let win = undefined;
let tray;

app.dock.hide();

app.on('ready', () => {
  makeTray();
  makeWindow();
});

const appIcon = path.join(__dirname, 'tray-icon.png');

const makeTray = () => {
  tray = new Tray(appIcon);
  tray.setToolTip('Electron Music Box');

  tray.on('click', function(event) {
    toggleWindow();

    if (win.isVisible() && process.defaultApp && event.metaKey) {
      win.openDevTools({ mode: 'detach' })
    }
  });
}

const makeWindow = () => {
  win = new BrowserWindow({
    width: 300,
    height: 530,
    show: false,
    frame: false,
    resizable: false,
    fullscreen: false,
    transparent: true,
    title: 'Electron Music Box'
  });

  win.loadURL(`file://${path.join(__dirname, 'index.html')}`);

  win.on('blur', () => {
    if(!win.webContents.isDevToolsOpened) {
      win.hide();
    }
  });
}

app.on('window-all-closed', () => {
  app.quit();
})


const toggleWindow = () => {
  if (win.isVisible()) {
    win.hide()
  } else {
    showWindow();
  }
  // console.log(win.isVisible());
}

const showWindow = () => {
  const trayPos = tray.getBounds();
  const winPos = win.getBounds();

  let x, y = 0;

  if (process.platform === 'darwin') {
    x = Math.round(trayPos.x + (trayPos.width / 2) - (winPos.width / 2));
    y = Math.round(trayPos.y + trayPos.height);
  }

  win.setPosition(x, y, false);
  win.show();
  win.focus();

}

ipcMain.on('show-window', () => {
  showWindow();
});
