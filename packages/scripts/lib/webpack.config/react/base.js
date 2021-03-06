const path = require('path');
const { merge } = require('webpack-merge');
module.exports = merge(require('../baseConfig'), {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, '../tsconfig.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ]
    },
});