const electron = require('electron'); 
const path = require('path'); 
const fs = require('fs');
  
// Importing dialog module using remote 
const dialog = electron.remote.dialog; 
  
var uploadFile = document.getElementById('button'); 
  
// Defining a Global file path Variable to store  
// user-selected file 
global.filepath = undefined; 
  
uploadFile.addEventListener('click', () => { 
// If the platform is 'win32' or 'Linux' 
    if (process.platform !== 'darwin') { 
        // Resolves to a Promise<Object> 
        dialog.showOpenDialog({ 
            title: 'Select the File to be uploaded', 
            defaultPath: path.join(__dirname, '../assets/'), 
            buttonLabel: 'Upload', 
            // Restricting the user to only Text Files. 
            filters: [ 
                { 
                    name: 'Text Files', 
                    extensions: ['txt', 'docx'] 
                }, ], 
            // Specifying the File Selector Property 
            properties: ['openFile'] 
        }).then(file => { 
            // Stating whether dialog operation was 
            // cancelled or not. 
            console.log(file.canceled); 
            if (!file.canceled) { 
              // Updating the GLOBAL filepath variable  
              // to user-selected file. 
              global.filepath = file.filePaths[0].toString(); 
              console.log(global.filepath); 
            }   
        }).catch(err => { 
            console.log(err) 
        }); 
    } 
    else { 
        // If the platform is 'darwin' (macOS) 
        dialog.showOpenDialog({ 
            title: 'Select the File to be uploaded', 
            defaultPath: path.join(__dirname, '../assets/'), 
            buttonLabel: 'Upload', 
            filters: [ 
                { 
                    name: 'Text Files', 
                    extensions: ['png', 'jpg','txt'] 
                }, ], 
            // Specifying the File Selector and Directory  
            // Selector Property In macOS 
            properties: ['openFile', 'openDirectory'] 
        }).then(file => { 
            console.log(file.canceled); 
            global.filepath = file.filePaths[0].toString();
            if (global.filepath && !file.canceled) {
               
              fs.readFile(global.filepath, {encoding: 'utf-8'}, function(err,data) { 
            if (!err) { 
              console.log('received data: ' + data); 
            } else { 
              console.log(err); 
            } 
        }); 
            }  
        }).catch(err => { 
            console.log(err) 
        }); 
    } 
}); 