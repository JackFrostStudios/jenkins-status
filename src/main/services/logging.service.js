const environmentService = require('./environment.service');

exports.log = (data) => {
    if (environmentService.isDevMode()) {
        console.log(data);
    }
}