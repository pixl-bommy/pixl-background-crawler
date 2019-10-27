const fs = require("fs");
const path = require("path");

const values = {
    found: 0,
    done: 0,
    failed: 0,
}

let webContents = null;

function incFound() {
    values.found += 1;

    if (webContents)
        webContents.send("inc.found", values.found);
}

function incDone() {
    values.done += 1;

    if (webContents)
        webContents.send("inc.done", values.done);
}

function incFailed() {
    values.failed += 1;

    if (webContents)
        webContents.send("inc.failed", values.failed);
}

/// TODO: done and failed jobs will be counted
module.exports = function start(contents) {
    webContents = contents;

    fs.watch(__dirname, {}, (event, filename) => {
        if (event === "rename") {
            if (fs.existsSync(path.resolve(__dirname, filename))) {
                console.log("add", filename);
                incFound();
            } else {
                console.log("rem", filename);
            }
        }
    });
}
