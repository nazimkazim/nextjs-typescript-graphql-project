const path = require('path');

module.exports = {
  wepack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  }
};