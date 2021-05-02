const path = require('path');
const pathExists = require('path-exists').sync;
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { VueLoaderPlugin } = require('vue-loader');

function queryEntryFile() {
    const returnData = {
        entry: '',
        err: ''
    };
    const files = ['index.js', 'index.ts', 'main.js', 'main.ts'];
    for (const file of files) {
        const entry = path.join(process.cwd(), 'src', file);
        if (pathExists(entry)) {
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
console.log(
    path.join(process.cwd(), 'dist')
);

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: entry,
    output: {
        path: path.join(process.cwd(), 'dist'),
        publicPath: '/',
        filename: 'js/bundle-[hash].js'
    }
}