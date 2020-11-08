const { net } = require('electron')
const loggingService = require('../logging/logging.service');

const getStatusCodeMessage = (statusCode) => {
    switch (statusCode) {
        case 401:
        case 403:
            return "Access to the server was denied. Please check credentials and try again.";
        default:
            return `Invalid Server response - Code ${statusCode}. Please contact your administrator.`;
    }
}

const logEvent = (httpEvent, data) => {
    loggingService.log({httpEvent, data });
}

exports.basicAuthHeader = (username, password) => {
    return {
        name: 'Authorization',
        value: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
    };
}

exports.get = async (url, headers) => {
    return new Promise((resolve, reject) => {
        const request = net.request(url);
        headers.forEach(({name, value}) => {
            request.setHeader(name, value);
        });
        let result = "";
        request.on('response', (response) => {
            logEvent("RESPONSE", {
                statusCode: response.statusCode,
                headers: response.headers,
            });
            response.on('data', (chunk) => {
                logEvent('RESPONSE:DATA',{
                    chunk: chunk
                });
                result += `${chunk}`;
            });
            response.on('error', (err) => {
                logEvent('RESPONSE:ERROR', {
                    error: err
                });
                reject("Error Contacting Server");
            });
            response.on('end', () => {
                logEvent('RESPONSE:END');
                if (response.statusCode === 200) {
                    resolve(result);
                } else {
                    reject(`Error : ${getStatusCodeMessage(response.statusCode)}`);
                }
            });
        });
        
        request.on('error', (err) => {
            logEvent('REQUEST:ERROR', {
                error: err
            });
            reject("Error : Unable to contact server. Please check connection details and try again.");
        });

        request.end(); 
    });
}