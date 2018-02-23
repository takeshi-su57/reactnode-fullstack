const fs = require('fs');
const path = require('path');
const express = require('express');
const universal = require('./universal');

module.exports = function addProdMiddlewares(app, options) {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');
  app.use(publicPath, express.static(outputPath, { index: false }));

  app.get('*', (req, res) => {
    fs.readFile(path.resolve(outputPath, 'index.html'), (err, file) => {
      if (global.appConfig.ssrEnabled) {
        universal(req, res, file.toString());
      } else {
        res.send(file.toString());
      }
    });
  });
};
