const Store = require('electron-store');

const store = new Store();

exports.get = key => store.get(key);

exports.set = (key, value) => {
  store.set(key, value);
};