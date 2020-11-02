const localStore = require('./local-store.service');
const secureStore = require('./secure-store.service');

const serverSettingsStoreKey = "server-settings";
const serverSettingsPasswordKey = "jenkins-server-password";

exports.saveServerSettings = ({url, username, password}) => {
    localStore.set(serverSettingsStoreKey, {url, username});
    secureStore.set(serverSettingsPasswordKey, password);
}

exports.getServerSettings = async () => {
    let settings = localStore.get(serverSettingsStoreKey);
    settings.password = await secureStore.get(serverSettingsPasswordKey);
    return settings;
}