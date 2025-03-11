//Ce script sera executé avant le chargement de la fenêtre
//Accès aux API Node et Electron

const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld('versions',{
    //fonction qui récupère les versions via ipc
    getVersions : () => ipcRenderer.invoke('get-versions')
})
console.log("Preload chargé")