const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

function queryEntryFile() {
    const returnData = {
        entry: '',
        err: ''
    };
    const files = ['index.js', 'index.ts', 'main.js', 'main.ts'];
    for (const file of files) {
        const entry = path.join(process.cwd(), 'src', file);
        if (require('path-exists').sync(entry)) {
            returnData.entry = entry;
            return returnData;
        }
    }
    returnData.err = 'src directory no entry file, please create index.js or index.ts or main.js or main.ts file';
    return returnData;
}

// get entry path
const { entry, err } = queryEntryFile()
if (err) {
    console.log(
        require('colors').red(err)
    );
    return;
}


module.exports = {
    entry: entry,
    output: {
        path: path.join(process.cwd(), 'dist'),
        publicPath: '/',
        filename: 'js/bundle-[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader' // 依赖 @vue/compiler-sfc
            },
            {
                test: /\.ts$/,

                loader: 'ts-loader',

                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    outputPath: 'img/',
                    name: '[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    outputPath: 'media/',
                    name: '[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    outputPath: 'font/',
                    name: '[name].[hash:7].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue': '@vue/runtime-dom'
        },
        alias: {
            '@': path.join(__dirname, '..', 'src'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        new VueLoaderPlugin(),
    ],
}