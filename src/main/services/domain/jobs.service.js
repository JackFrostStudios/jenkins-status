const settingsService = require('./settings.service');
const jenkinsService = require('./jenkins.service');
const loggingService = require('../logging/logging.service');
const httpService = require('../communication/http.service');

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

exports.getNode = async ({url, username, password}) => {
    const result = await httpService.get(`${url}/api/json`, [
        httpService.basicAuthHeader(username, password),
        {name: 'Content-Type', value: 'application/json'}
    ]);

    return JSON.parse(result);
}

exports.getJobLastBuild = async(jobName) => {
    try {
        let encJN = encodeURIComponent(jobName);
        const { url, username, password } = await settingsService.getServerSettings()
        const result = await httpService.get(`${url}/job/${encJN}/lastBuild/api/json`, [
            httpService.basicAuthHeader(username, password),
            {name: 'Content-Type', value: 'application/json'}
        ]);

        return JSON.parse(result);
    } catch (err) {
        loggingService.log({GetJobError: err});
        return null;
    }
}