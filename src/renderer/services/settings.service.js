const ipcService = require('./ipc.service');
const ipcChannels = require('../../common/ipc-channels');

exports.getServerSettings = async () => {
    return await ipcService.invoke(ipcChannels.getServerSettingsChannel);
};

exports.setServerSettings = settings => {
    ipcService.invoke(ipcChannels.setServerSettingsChannel, settings);
};

exports.validateSettings = async settings => {
    return await ipcService.invoke(ipcChannels.validateServerSettingsChannel, settings);
};