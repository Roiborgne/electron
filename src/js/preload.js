//Ce script sera executé avant le chargement de la fenêtre
//Accès aux API Node et Electron

const {contextBridge} = require("electron");

contextBridge.exposeInMainWorld('versions',{
    electron: process.versions.electron,
    node: process.versions.node,
    chrome: process.versions.chrome,
})
console.log("Preload chargé")