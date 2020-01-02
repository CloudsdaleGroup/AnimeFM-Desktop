var electron = require("electron");
var url = require('url');
var path = require('path');

var {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindows

app.on('ready', function(){
    //create window
    mainWindow = new BrowserWindow({});
    //load HTML
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    //quit all if closed
    mainWindow.on('closed', function(){
        app.quit();
    })

    //build menu
    var mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu)
});

//Handle add windows
//function createAddWindow(){
//        //create window
//        addWindow = new BrowserWindow({
//            width: 300,
//            height: 200,
//            title: 'add burrito'
//        });
//        //load HTML
//        addWindow.loadURL(url.format({
//            pathname: path.join(__dirname, 'addWindow.html'),
//            protocol: 'file:',
//            slashes: true
//        }));
//        //Garbage shit handle
//        addWindow.on('close', function(){
//             addWindows = null;
//         })
//}

//Menu template
var mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label:'Kill me',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    },
    {
        label:"OwO"
    }
]

//if mac remove electron object
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({})
}

//add dev tools if not prod
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Dev Tools',
        submenu: [
            {
                label: 'Show console',
                accelerator: process.platform == 'darwin' ? 'Command+Shift+I' : 'Ctrl+Shift+I',
                click(item, focusedWindows){
                    focusedWindows.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}