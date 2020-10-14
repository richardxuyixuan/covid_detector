console.log('main process working');
console.log('main.js');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

let winOne;


function createWindow(){
	winOne = new BrowserWindow({
		width:1060,
		height:800,
		frame:true,
		webPreferences: { 
      	nodeIntegration: true,
  		enableRemoteModule: true} 
	});
	
	winOne.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol:'file',
		slashes: true
	}));
	winOne.on('closed',() => {
		win = null;
	});
	winOne.webContents.openDevTools() 

}

app.on('ready', createWindow);

app.on('window-all-closed',()=>{
	if (process.platform !== 'darwin'){
		app.quit()
	}
});

app.on('activate', () => {
	if (win === null) {
		createWindow()
	}
});

