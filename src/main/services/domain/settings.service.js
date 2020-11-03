const localStore = require('../storage/local-store.service');
const secureStore = require('../storage/secure-store.service');
const jenkinsService = require('./jenkins.service');

const serverSettingsStoreKey = "server-settings";
const serverSettingsPasswordKey = "jenkins-server-password";
const jobSettingsStoreKey = "job-settings";

let cachedServerSettings = null;
let cachedJobSettings = null;

exports.saveServerSettings = async ({url, username, password}) => {
    await localStore.set(serverSettingsStoreKey, {url, username});
    await secureStore.set(serverSettingsPasswordKey, password);
    cachedServerSettings = {url, username, password};
}

exports.getServerSettings = async () => {
    if (cachedServerSettings) return cachedServerSettings;
    let settings = localStore.get(serverSettingsStoreKey);
    settings.password = await secureStore.get(serverSettingsPasswordKey);
    return settings;
}

exports.validateServerSettings = async (settings) => {
    try {
        await jenkinsService.getNode(settings);
        return {
            valid: true,
            error: ""
        };
    } catch (err) {
        return {
            valid: false,
            error: err
        }
    }
};

exports.saveJobSettings = async (settings) => {
    await localStore.set(jobSettingsStoreKey, settings);
    cachedJobSettings = settings;
};

exports.getJobSettings = async () => {
    if (cachedJobSettings) return cachedJobSettings;
    return await localStore.get(jobSettingsStoreKey);
};