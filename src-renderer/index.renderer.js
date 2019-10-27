const { ipcRenderer } = require("electron");

ipcRenderer.on("inc.found", (_, value) => {
    window.document.getElementById("out-found").innerHTML = value;
});

ipcRenderer.on("inc.done", (_, value) => {
    window.document.getElementById("out-done").innerHTML = value;
});

ipcRenderer.on("inc.failed", (_, value) => {
    window.document.getElementById("out-failed").innerHTML = value;
});