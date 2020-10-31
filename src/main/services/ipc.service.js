const { ipcMain } = require('electron')

exports.handle = (channel, callback) => {
    ipcMain.handle(channel, (event, args) => {
        let result = callback(event, args);
        console.log({channel, args, result});
        return result;
    });
};