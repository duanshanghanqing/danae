// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const webpack = require('webpack');

// build dev
// const config = require('../config/webpack.dev.config');
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

// start dev server
const WebpackDevServer = require('webpack-dev-server')
const devConfig = require('../config/webpack.dev.config');
const devServerConfig = require('../config/webpack.dev.server.config');
const compiler = webpack(devConfig);
const devServer = new WebpackDevServer(compiler, devServerConfig.devServer);
const PORT = devServerConfig.devServer.port || process.env.PORT || 3000;
const HOST = devServerConfig.devServer.host || process.env.HOST || '0.0.0.0';
devServer.listen(PORT, HOST, err => {
  if (err) {
    return console.log(err);
  }
  console.log('Starting the development server...\n');
})