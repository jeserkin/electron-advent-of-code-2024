const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    readDirectory: async (dirPath) => {
        return await ipcRenderer.invoke('read-directory', dirPath);
    },
    readFile: async (filePath) => {
        return await ipcRenderer.invoke('read-file', filePath);
    },
});