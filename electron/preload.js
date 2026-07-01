const { contextBridge, ipcRenderer } = require('electron');

async function init() {
  let mapsApiKey = '';
  if (typeof ipcRenderer.invoke === 'function') {
    try {
      const result = await ipcRenderer.invoke('maps:getApiKey');
      mapsApiKey = typeof result === 'string' ? result : '';
    } catch {
      mapsApiKey = '';
    }
  }

  contextBridge.exposeInMainWorld('electronAPI', {
    mapsApiKey,
    async getMapsDiagnostics() {
      try {
        const diagnostics = await ipcRenderer.invoke('maps:getApiDiagnostics');

        const hasKey = Boolean(diagnostics?.hasKey);
        const keyLength =
          typeof diagnostics?.keyLength === 'number' && diagnostics.keyLength >= 0
            ? diagnostics.keyLength
            : 0;
        const keyPrefix = typeof diagnostics?.keyPrefix === 'string' ? diagnostics.keyPrefix : '';
        const source = diagnostics?.source === 'env' ? 'env' : 'missing';

        return { hasKey, keyLength, keyPrefix, source };
      } catch {
        return { hasKey: false, keyLength: 0, keyPrefix: '', source: 'missing' };
      }
    },
  });
}

init();
