const environmentService = require('../environment/environment.service');

exports.log = (data) => {
    if (environmentService.isDevMode()) {
        console.log(data);
    }
}