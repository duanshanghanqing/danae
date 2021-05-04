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
                            // configFile: path.resolve(__dirname, '../tsconfig.build.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ]
    },
});