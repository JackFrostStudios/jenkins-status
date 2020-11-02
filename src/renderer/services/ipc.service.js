const { ipcRenderer } = require('electron')
const loggingService = require('./logging.service');

exports.invoke = async (channel, args) => {
    let result = await ipcRenderer.invoke(channel, args);
    loggingService.log({channel, args, result});
    return result;
};