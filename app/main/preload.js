const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  ipcRenderer: {
    async writeLog(content) {
      ipcRenderer.send('writeLog', content);
    },
    async backupConfigFile() {
      ipcRenderer.send('backupConfigFile');
    },
    async readConfigFile(func) {
      ipcRenderer.send('readConfigFile');
      ipcRenderer.once('sendConfigJson', (_, data) => {
        func(data);
      });
    },
    async writeConfigFile(config) {
      ipcRenderer.send('writeConfigFile', config);
    },
    async exchangePrize(id) {
      ipcRenderer.send('exchangePrize', id);
    },
    async getConfigPath(func) {
      ipcRenderer.send('configFilePath');
      ipcRenderer.once('sendConfigPath', (_, data) => {
        func(data);
      });
    },
  },
});
