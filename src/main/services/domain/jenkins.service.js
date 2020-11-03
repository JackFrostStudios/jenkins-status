const httpService = require('../communication/http.service');

exports.getNode = async ({url, username, password}) => {
    const result = await httpService.get(`${url}/api/json`, [
        httpService.basicAuthHeader(username, password),
        {name: 'Content-Type', value: 'application/json'}
    ]);

    return JSON.parse(result);
}