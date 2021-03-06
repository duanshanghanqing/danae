const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./baseConfig');
const internalIp = require('internal-ip');

module.exports = merge(baseConfig, {
    devServer: {
        port: 3000,
        host: internalIp.v4.sync(),
        contentBase: './dist',
        hot: true,
        historyApiFallback: true, // 解决f5刷新界面报404问题
        open: true,
    },
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            // 编译模板中的样式
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    { loader: 'postcss-loader' }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // { loader: 'vue-style-loader' }, // 没什么用
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    { loader: 'postcss-loader' },
                    { loader: 'less-loader' }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wmv|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                ENV: '"development"'
            }
        })
    ]
});