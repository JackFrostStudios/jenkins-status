const ipcService = require('./ipc.service');
const ipcChannels = require('../../common/ipc-channels');

exports.getJobs = async () => {
    return await ipcService.invoke(ipcChannels.getJobs);
};