const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const renderServer = require('./render-server');
const renderDom = require('./render-dom');

function createWebpackMiddleware(compiler) {
  return webpackDevMiddleware(compiler, {
    // noInfo: true,
    // publicPath,
    // silent: true,
    // https://github.com/webpack/webpack-dev-middleware/issues/142
    index: 'nonexistent.html',
    stats: 'errors-only',
    serverSideRender: true,
  });
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
  const compiler = webpack(webpackConfig);
  const middleware = createWebpackMiddleware(compiler, webpackConfig.output.publicPath);

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler, {
    heartbeat: 2000,
  }));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else if (global.appConfig.ssrEnabled) {
        renderServer(req, res, file.toString());
      } else {
        renderDom(req, res, file.toString());
      }
    });
  });
};
