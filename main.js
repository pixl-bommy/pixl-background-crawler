const { app, BrowserWindow, Tray } = require("electron");

const path = require("path");

let mainWindow = null;
let mainTray = null;

/**
 * Create a new main window and open index.html.
 */
const createWindow = () => {
    const windowPreferences = {
        width: 960,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    };

    mainWindow = new BrowserWindow(windowPreferences);

    // destroy window reference, if window was closed
    mainWindow.on("closed", () => mainWindow = null);

    mainWindow.loadFile(path.join(__dirname, "/public/index.html"));
    mainWindow.webContents.openDevTools();
}

/**
 * Exit app, if all windows were closed.
 * Info: If we're running on macOS, the app will be paused and not destroyed.
 */
app.on("window-all-closed", () => {
    if (process.platform === "darwin") return;
    app.quit();
});

app.on("renderer-process-crashed", () => app.quit());

/**
 * Create the main window on macOS, after the app was 'paused' and reactivated.
 */
app.on("activate", () => {
    if (mainWindow === null)
        createWindow();
});

/**
 * Initial create the main window on app start up.
 */
app.on("ready", () => {
    mainTray = new Tray(path.join(__dirname, "public/icon.jpg"));
    mainTray.setTitle("pixl Background Crawler");
    createWindow();
});
