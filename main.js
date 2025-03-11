//1. renommé le package.json clé main en main.js

// Processus Principal

const {app, BrowserWindow, ipcMain, Menu} = require("electron")
const path = require("path")
const process = require("node:process");

let window;
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
    //Créer le menu
    createMenu()
    window.loadFile('src/pages/index.html');
}

//Fonction permettant de créer un menu personalisé
function createMenu() {
    //Créer un modèle qui va représenter le menu -> modèle
    const template = [
        {
            label : "App",
            submenu: [
                {
                    label : "Versions",
                    click : () => window.loadFile("src/pages/index.html")
                },
                {
                    label : "Quitter",
                    accelerator: process.platform === "Darwin" ? "Cmd+Q" : "CTRl + Q",
                    click : () => app.quit()
                }
                ]
        },
        {
            label : "Tâches",
            submenu: [
                {
                    label : "Lister",
                    click : () => window.loadFile("src/pages/listes-taches.html")
                },
                {
                    label : "Ajouter",
                    click : () => window.loadFile("src/pages/ajouter.html")
                }
                ]
        }
    ]
    //Créer le menu à partir du modèle
    const menu = Menu.buildFromTemplate(template)

    //Définir le menu comme étant le menu de l'application
    Menu.setApplicationMenu(menu)
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