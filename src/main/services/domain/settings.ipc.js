const ipcService = require('../communication/ipc.service');
const ipcChannels = require('../../../common/ipc-channels');
const settingsService = require('./settings.service');

ipcService.handle(ipcChannels.setServerSettingsChannel, (event, args) => {
    settingsService.saveServerSettings(args);
});

ipcService.handle(ipcChannels.getServerSettingsChannel, async (event, args) => {
    return await settingsService.getServerSettings();
});

ipcService.handle(ipcChannels.validateServerSettingsChannel, async (event, args) => {
    return await settingsService.validateServerSettings(args);
});