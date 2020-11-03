const { ipcMain } = require('electron')
const loggingService = require('../logging/logging.service');

exports.handle = (channel, callback) => {
    ipcMain.handle(channel, async (event, args) => {
        let result = await callback(event, args);
        loggingService.log({ channel, args, result });
        return result;
    });
};