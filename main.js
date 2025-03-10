//1. renommé le package.json clé main en main.js

// Processus Principal

const {app, BrowserWindow} = require("electron")
//Créer la fenêtre principale

function createwindow() {

    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, //Accès aux API Node depuis le processus rendu
            contextIsolation: false
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