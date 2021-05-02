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
const baseConfig = require('../webpack.config/webpack.base.config');

// function runWebpack(config) {
//   return new Promise((resolve, reject) => {
//       return webpack(config).run((err, stats) => {
//           return err ? reject(err) : resolve(stats);
//       });
//   });
// }

// (async function() {
//   await runWebpack(baseConfig);
// })();

const serverConfig = require('../webpack.config/webpack.dev.server.config');
const WebpackDevServer = require('webpack-dev-server');
const compiler = webpack(baseConfig);
const devServer = new WebpackDevServer(compiler, serverConfig);

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = 3000;
const HOST = '0.0.0.0';
devServer.listen(DEFAULT_PORT, HOST, err => {
  if (err) {
    return console.log(err);
  }
  console.log('ok');
  // console.log(chalk.cyan('Starting the development server...\n'));
  // openBrowser(urls.localUrlForBrowser);
});

