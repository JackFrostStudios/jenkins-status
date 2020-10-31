const localStore = require('./local-store.service');
const ipc = require('./ipc.service');

const setServerSettingsChannel = "set-server-settings";
const getServerSettingsChannel = "get-server-settings";
const serverSettingsStoreKey = "server-settings";

const saveServerSettings = (settings) => {
    localStore.set(serverSettingsStoreKey, settings);
}

const getServerSettings = () => {
    return localStore.get(serverSettingsStoreKey);
}

ipc.handle(setServerSettingsChannel, (event, args) => {
    saveServerSettings(args);
});

ipc.handle(getServerSettingsChannel, (event, args) => {
    return getServerSettings();
});