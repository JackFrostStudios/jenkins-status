const ipcService = require('./ipc.service');
const ipcChannels = require('../../common/ipc-channels');

let cachedIsDev = null;

exports.isDevMode = () => {
    return cachedIsDev = cachedIsDev ? cachedIsDev : window.process.argv.some(arg => arg === "--DEV=true");
}