require('dotenv').config();
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

const isDev = !app.isPackaged;

ipcMain.handle('maps:getApiKey', () => {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  return typeof key === 'string' ? key : '';
});

ipcMain.handle('maps:getApiDiagnostics', () => {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  const safeKey = typeof key === 'string' ? key : '';
  const hasKey = safeKey.length > 0;

  return {
    hasKey,
    keyLength: safeKey.length,
    keyPrefix:
      safeKey.length > 0
        ? `${safeKey.slice(0, 6)}${'*'.repeat(Math.max(0, safeKey.length - 6))}`
        : '',
    source: hasKey ? 'env' : 'missing',
  };
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    backgroundColor: '#111827',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
