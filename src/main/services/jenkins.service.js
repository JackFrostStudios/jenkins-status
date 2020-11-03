const httpService = require('./http.service');

exports.getNode = async ({url, username, password}) => {
    return await httpService.get(`${url}/api/json`, [
        httpService.basicAuthHeader(username, password),
        {name: 'Content-Type', value: 'application/json'}
    ]);
}