const { app, BrowserWindow, ipcMain, Tray } = require('electron');
const path = require('path');

const config = require('./config');

// Set up Tray and Window variables
let win;
let tray;

// Remove the app's icon in the dock
app.dock.hide();

// Once the app is ready, make the menu tray and create a new window.
app.on('ready', () => {
  makeTray();
  makeWindow();
});

// Store the app's tray icon in a variable — required to make the tray.
const appIcon = path.join(__dirname, 'static/images/tray-icon.png');

/**
 *
 * makeTray() function
 *
 * Create a new menu Tray for the application, and when the icon is clicked it
 * will toggle the appearance of the app.
 *
 */
const makeTray = () => {
  tray = new Tray(appIcon);
  tray.setToolTip(config.appName);

  // Toggle the app's window when the tray's icon is clicked
  tray.on('click', function(event) {
    toggleWindow();

    if (win.isVisible() && process.defaultApp && event.metaKey) {
      win.openDevTools({ mode: 'detach' })
    }
  });
}

/**
 *
 * makeWindow() function
 *
 * Create a new Electron App window, with specific settings.
 * Make it a transparent app that is minimal and can't be resized.
 * Also remove the title frame.
 *
 */
const makeWindow = () => {
  win = new BrowserWindow({
    width: 300,
    height: 530,
    show: false,
    frame: false,
    resizable: false,
    fullscreen: false,
    transparent: true,
    title: config.appName
  });

  // Load the project's HTML file into the app window
  win.loadURL(`file://${path.join(__dirname, 'index.html')}`);

  // When the user goes to another app, hide our app
  win.on('blur', () => {
    if(!win.webContents.isDevToolsOpened) {
      win.hide();
    }
  });
}

// If the app's window is closed, quit the app
app.on('window-all-closed', () => {
  app.quit();
})

/**
 *
 * toggleWindow() function
 *
 * If the app is visible, hide the app.
 * If not, show the app.
 *
 */
const toggleWindow = () => {
  if (win.isVisible()) {
    win.hide()
  } else {
    showWindow();
  }
}

/**
 *
 * showWindow() function
 *
 * First, get the size of the tray and the app window.
 * Next, check if the app is running on macOS/OS X.
 * If it is, set the app to align to the middle of the tray's position.
 * Then, show the window.
 *
 */
const showWindow = () => {
  const trayPos = tray.getBounds();
  const winPos = win.getBounds();

  // set x and y co-ordinate variables to 0
  let x, y = 0;

  if (process.platform === 'darwin') {
    x = Math.round(trayPos.x + (trayPos.width / 2) - (winPos.width / 2));
    y = Math.round(trayPos.y + trayPos.height);
  }

  win.setPosition(x, y, false);
  win.show();
  win.focus();

}

// When the app's file sends the 'show-window' event, run showWindow()
ipcMain.on('show-window', () => {
  showWindow();
});
