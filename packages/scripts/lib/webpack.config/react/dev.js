const { merge } = require('webpack-merge');
module.exports = merge(require('./base'), require('../baseDevConfig'));
