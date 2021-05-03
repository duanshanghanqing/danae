// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';


// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
// process.on('unhandledRejection', err => {
//     throw err;
// });

const webpack = require('webpack');

// runWebpack
function runWebpack(webpackConfig = {}) {
    return new Promise((resolve, reject) => {
        return webpack(webpackConfig).run((err, stats) => {
            return err ? reject(err) : resolve(stats);
        });
    });
}


// Judge project type
const { getProjectType } = require('../utils');


// build prod
(async function () {
    let config;
    const projectType = getProjectType();
    if (projectType === 'vue') {
        config = require('../webpack.config/vue/prod');
    } else if (projectType === 'react') {
        config = require('../webpack.config/react/prod');
    }
    try {
        await runWebpack(config);
    } catch (error) {
        console.error(error);
    }
})();