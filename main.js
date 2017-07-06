const { app, BrowserWindow, ipcMain, Tray } = require('electron');
const path = require('path');

let win;
let tray;

app.dock.hide();
app.on('ready', () => {
  makeTray();
  makeWindow();
});

const makeTray = () => {
  tray = new Tray(`${path.join(__dirname, 'tray-icon.png')}`);

  tray.on('click', function(event) {
    toggleWindow();

    if (win.isVisible() && process.defaultApp && event.metaKey) {
      win.openDevTools({mode: 'detach'})
    }
  });
}

const makeWindow = () => {
  win = new BrowserWindow({
    width: 300,
    height: 200,
    show: false,
    frame: false,
    resizable: false,
    transparent: true,
  });

  win.loadURL(`file://${path.join(__dirname, 'index.html')}`);

  win.on('blur', () => {
    if(!win.webContents.isDevToolsOpened) {
      win.hide();
    }
  });
}

app.on('window-all-closed', () => {
  app.quit()
})


const toggleWindow = () => {
  if(win.isVisible) {
    win.hide();
  } else {
    showWindow();
  }
}

const showWindow = () => {
  const trayPos = tray.getBounds();
  const winPos = win.getBounds();

  let x, y = 0;

  if (process.platform === 'darwin') {
    x = Math.round(trayPos.x + (trayPos.width / 2) - (winPos.width / 2));
    y = Math.round(trayPos.y + trayPos.height);
  }

  win.setPosition(x, y, false)
  win.show();
  win.focus();

}

ipcMain.on('show-window', () => {
  showWindow();
})
