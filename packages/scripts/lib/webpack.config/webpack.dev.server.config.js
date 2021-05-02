const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackbaseconfig = require('./webpack.base.config');
// const webpackdevconfig = require('./webpack.dev.config');

module.exports = merge(webpackbaseconfig, {
    devServer: {
        // port: 9002,
        // contentBase: './static',
        // hot: true,
        // historyApiFallback: true, // 解决f5刷新界面报404问题
        // open: true,
        // proxy: {
        //     '/omp-web': {
        //         target: 'http://localhost:8878',
        //         secure: false,
        //         changeOrigin: true
        //     }
        // }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});