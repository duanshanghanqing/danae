const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    configFile: path.resolve(__dirname, '../tsconfig.json'),
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
};
