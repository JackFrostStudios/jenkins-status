const ipcService = require('./ipc.service');
const ipcChannels = require('../../common/ipc-channels');

exports.getServerSettings = async () => {
    return await ipcService.invoke(ipcChannels.getServerSettingsChannel);
};

exports.setServerSettings = settings => {
    ipcService.invoke(ipcChannels.setServerSettingsChannel, settings);
};

exports.validateServerSettings = async settings => {
    return await ipcService.invoke(ipcChannels.validateServerSettingsChannel, settings);
};

exports.getJobSettings = async () => {
    return await ipcService.invoke(ipcChannels.getJobSettingsChannel);
};

exports.setJobSettings = settings => {
    ipcService.invoke(ipcChannels.setJobSettingsChannel, settings);
};