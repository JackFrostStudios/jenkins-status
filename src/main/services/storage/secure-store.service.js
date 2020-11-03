const keytar = require('keytar')
const secureStoreServiceName = "jfs-jenkins-status";

exports.set = (key, value) => {
    keytar.setPassword(secureStoreServiceName, key, value);
}

exports.get = (key) => {
    return keytar.getPassword(secureStoreServiceName, key);
}