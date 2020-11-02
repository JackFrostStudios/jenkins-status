const ipcService = require('./ipc.service');
const ipcChannels = require('../../common/ipc-channels');

exports.getServerSettings = async () => {
    let settings = await ipcService.invoke(ipcChannels.getServerSettingsChannel);
    return settings;
};

exports.setServerSettings = settings => {
    ipcService.invoke(ipcChannels.setServerSettingsChannel, settings);
};