const settingsService = require('./settings.service');
const jenkinsService = require('./jenkins.service');
const loggingService = require('../logging/logging.service');

exports.getJobs = async() => {
    try {
        const settings = await settingsService.getServerSettings()
        const nodeDetails = await jenkinsService.getNode(settings);
        console.log({nodeDetails});
        return nodeDetails.jobs ?? [];
    } catch (err) {
        loggingService.log({GetJobsError: err});
        return [];
    }
}