const { merge } = require('webpack-merge');
const { getProjectWebpackConfig } = require('../../utils');

module.exports = merge(
    require('../baseProdConfig'), 
    require('./base'), 
    getProjectWebpackConfig()
);
