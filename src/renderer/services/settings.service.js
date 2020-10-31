const ipcService = require('./ipc.service');

const setServerSettingsChannel = "set-server-settings";
const getServerSettingsChannel = "get-server-settings";

exports.getServerSettings = async () => {
    let settings = await ipcService.invoke(getServerSettingsChannel);
    return settings;
};

exports.setServerSettings = settings => {
    ipcService.invoke(setServerSettingsChannel, settings);
};