const environmentService = require('./environment.service');

exports.log = async (data) => {
    if (environmentService.isDevMode()) {
        console.log(data);
    }
}