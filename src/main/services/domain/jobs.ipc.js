const ipcService = require('../communication/ipc.service');
const ipcChannels = require('../../../common/ipc-channels');
const jobsService = require('./jobs.service');

ipcService.handle(ipcChannels.getJobs, async (event, args) => {
    return await jobsService.getJobs();
});

ipcService.handle(ipcChannels.getJobLastBuild, async (event, args) => {
    return await jobsService.getJobLastBuild(args);
});