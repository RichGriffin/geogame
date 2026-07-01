# Agent Brief — Backend Lane (Electron Main Process)
# Cycle 1 · Wave 1

**Owner:** BE lane agent  
**Coordinator contract:** `implementation/contract-baseline.md`  
**Status at handoff:** NOT STARTED

---

## Mission

Expose the Google Maps API key from the Electron main process to the renderer via a secure contextBridge channel. The renderer must never hold the key in source code.

---

## Exact Files to Change

| File | Action |
|------|--------|
| `electron/main.js` | Add IPC handler for `maps:getApiKey` |
| `electron/preload.js` | Expose `window.electronAPI.mapsApiKey` via contextBridge |
| `.env` | Create if absent — user provides the key |
| `.gitignore` | Ensure `.env` is listed |
| `package.json` | No changes needed |

---

## Step-by-Step Implementation

### 1. `.env` file

Create `C:/dev/rg/geogame/.env`:
```
GOOGLE_MAPS_API_KEY=YOUR_KEY_HERE
```

Add to `.gitignore` if not already present:
```
.env
```

### 2. `electron/main.js`

Read the key using `process.env`. Load `.env` via the `dotenv` package OR read the file manually — check if `dotenv` is already installed; if not, add it with `npm install dotenv --save`.

At the top of `main.js`:
```js
require('dotenv').config();
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
```

Add the IPC handler BEFORE `app.whenReady()`:
```js
ipcMain.handle('maps:getApiKey', () => {
  return process.env.GOOGLE_MAPS_API_KEY ?? '';
});
```

### 3. `electron/preload.js`

Replace the existing empty comment with:
```js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  mapsApiKey: await ipcRenderer.invoke('maps:getApiKey'),
});
```

**Important:** `contextBridge.exposeInMainWorld` runs at preload time. Because it's top-level async, restructure as:

```js
const { contextBridge, ipcRenderer } = require('electron');

async function init() {
  const mapsApiKey = await ipcRenderer.invoke('maps:getApiKey');
  contextBridge.exposeInMainWorld('electronAPI', {
    mapsApiKey,
  });
}

init();
```

This runs before the renderer JS so `window.electronAPI.mapsApiKey` is available synchronously in React code.

---

## Verification

1. Start app with `npm run dev`
2. In the Electron DevTools console (it opens automatically in dev mode):
   ```js
   window.electronAPI.mapsApiKey
   // must return your key string, not undefined or empty
   ```
3. If it returns empty string, check `.env` is in `C:/dev/rg/geogame/.env` and `dotenv.config()` path is correct.

---

## Required Closeout Report

Reply with:
```
STATUS: DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED
files changed: [list]
verification command: window.electronAPI.mapsApiKey
verification result: [paste output]
assumptions: [any]
blockers: [if any]
```
