//1. renommé le package.json clé main en main.js

// Processus Principal

const {app, BrowserWindow, ipcMain} = require("electron")
const path = require("path")
const process = require("node:process");

//Créer la fenêtre principale

function createwindow() {

    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, //Accès aux API Node depuis le processus rendu
            contextIsolation: true,
            preload: path.join(__dirname, 'src/js/preload.js')
        }
    })
    window.loadFile('src/pages/index.html');
}

//initialisation de l'application au démarage
console.log("Application initialisé")
app.whenReady().then(() => {
    createwindow()
    app.on('Activate',() =>{
        if (BrowserWindow.getAllWindows().length === 0){
            createwindow()
        }
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
})

//Ecouter sur le canal get-versions
ipcMain.handle("get-versions", () =>{
    //Renvoyer un objet contenant les versions des outils
    return {
        electron : process.versions.electron,
        node : process.versions.node,
        chrome : process.versions.chrome
    }
})