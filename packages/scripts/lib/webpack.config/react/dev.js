const { merge } = require('webpack-merge');
const { getProjectWebpackConfig } = require('../../utils');

module.exports = merge(
    require('../baseDevConfig'), 
    require('./base'), 
    getProjectWebpackConfig()
);
