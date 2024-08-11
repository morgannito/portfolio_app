const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Mise à jour disponible',
        message: 'Une nouvelle mise à jour est disponible. Elle sera téléchargée en arrière-plan.',
        buttons: ['OK']
    });
});

autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Mise à jour prête',
        message: 'La mise à jour a été téléchargée. L’application va redémarrer pour l’installer.',
        buttons: ['Redémarrer']
    }).then(() => {
        autoUpdater.quitAndInstall();
    });
});

autoUpdater.checkForUpdatesAndNotify();

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL('https://lonewolf.fr');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});