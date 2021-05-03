const { merge } = require('webpack-merge');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = merge(require('../baseConfig'), {
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.vue$/,
                use: 'vue-loader' // 依赖 @vue/compiler-sfc
            }
        ]
    },
    resolve: {
        alias: {
            'vue': '@vue/runtime-dom'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
});