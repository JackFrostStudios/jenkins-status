const ipcService = require('./ipc.service');
const ipcChannels = require('../../common/ipc-channels');
const settingsService = require('./settings.service');

ipcService.handle(ipcChannels.setServerSettingsChannel, (event, args) => {
    settingsService.saveServerSettings(args);
});

ipcService.handle(ipcChannels.getServerSettingsChannel, async (event, args) => {
    return await settingsService.getServerSettings();
});