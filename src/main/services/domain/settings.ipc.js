const ipcService = require('../communication/ipc.service');
const ipcChannels = require('../../../common/ipc-channels');
const settingsService = require('./settings.service');

ipcService.handle(ipcChannels.setServerSettingsChannel, async (event, args) => {
    return await settingsService.saveServerSettings(args);
});

ipcService.handle(ipcChannels.getServerSettingsChannel, async (event, args) => {
    return await settingsService.getServerSettings();
});

ipcService.handle(ipcChannels.validateServerSettingsChannel, async (event, args) => {
    return await settingsService.validateServerSettings(args);
});

ipcService.handle(ipcChannels.getJobSettingsChannel , async (event, args) => {
    return await settingsService.getJobSettings();
});

ipcService.handle(ipcChannels.setJobSettingsChannel , async (event, args) => {
    return await settingsService.saveJobSettings(args);
});