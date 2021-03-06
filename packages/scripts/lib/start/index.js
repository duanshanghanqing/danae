// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
// process.on('unhandledRejection', err => {
//   throw err;
// });

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server')

// build dev
// const config = require('../webpack.config/vue/dev');
// function runWebpack(_config = {}) {
//   return new Promise((resolve, reject) => {
//       return webpack(_config).run((err, stats) => {
//           return err ? reject(err) : resolve(stats);
//       });
//   });
// }

// (async function () {
//   try {
//       await runWebpack(config);
//   } catch (error) {
//       console.error(error);
//   }
// })();


// Judge project type
const { getProjectType } = require('../utils');
const projectType = getProjectType();

// vue project
if ( projectType === 'vue') {
  const webpackConfig = require('../webpack.config/vue/dev');
  startDevServer(
    webpackConfig, 
    webpackConfig.devServer
  );
}
// react project
else if (projectType === 'react') {
  const webpackConfig = require('../webpack.config/react/dev');
  startDevServer(
    webpackConfig, 
    webpackConfig.devServer
  );
}

// startDevServer
function startDevServer(webpackConfig, devServerConfig) {
  const compiler = webpack(webpackConfig);
  const devServer = new WebpackDevServer(
    compiler,
    devServerConfig,
  );

  devServer.listen(devServerConfig.port, devServerConfig.host, err => {
    if (err) {
      return console.log(err);
    }
    console.log('Starting the development server...\n');
  });
}