const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function queryEntryFile() {
    const returnData = {
        entry: '',
        err: ''
    };
    const files = ['index.js', 'index.ts', 'index.jsx', 'index.tsx', 'main.js', 'main.ts'];
    for (const file of files) {
        const entry = path.join(process.cwd(), 'src', file);
        if (require('path-exists').sync(entry)) {
            returnData.entry = entry;
            return returnData;
        }
    }
    returnData.err = `src directory no entry file, please create ${files.join()}`;
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
    resolve: {
        extensions: ['.ts', '.js','.tsx', '.jsx', '.vue', '.json'],
        alias: {
            '@': path.join(process.cwd(), 'src'),
            'src': path.join(process.cwd(), 'src'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
    ],
}