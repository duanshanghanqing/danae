// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';


// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err;
});

const webpack = require('webpack');

// build prod
const config = require('../config/webpack.prod.config');
function runWebpack(_config = {}) {
    return new Promise((resolve, reject) => {
        return webpack(_config).run((err, stats) => {
            return err ? reject(err) : resolve(stats);
        });
    });
}

(async function () {
    try {
        await runWebpack(config);
    } catch (error) {
        console.error(error);
    }
})();