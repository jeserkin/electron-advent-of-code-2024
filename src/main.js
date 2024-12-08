const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

// Create the main window
function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1150,
        height: 600,
        title: 'Solutions for Advent of Code 2024',
        icon: 'src/favicon.png',
        webPreferences: {
            nodeIntegration: true, // Enables Node.js in the renderer process
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // Load the HTML file that has both sidebar and content area
    mainWindow.loadFile('src/index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

ipcMain.handle('read-directory', async (event, dirPath) => {
    try {
        const files = await fs.promises.readdir(dirPath, {withFileTypes: true});
        return files.map(file => ({
            name: file.name,
            isDirectory: file.isDirectory(),
        }));
    } catch (error) {
        console.error(error);
        return {error: error.message};
    }
});

ipcMain.handle('read-file', async (event, filePath) => {
    try {
        const content = await fs.promises.readFile(filePath, 'utf-8');
        return { content };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});