const { ipcRenderer } = require('electron')

exports.invoke = async (channel, args) => {
    let result = await ipcRenderer.invoke(channel, args);
    console.log({channel, args, result});
    return result;
};