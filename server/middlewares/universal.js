const path = require('path');
const fs = require('fs');
const React = require('react');
const { Provider } = require('react-redux');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');

const store = require('../../app/store');
const { default: App } = require('../../app/containers/App');

module.exports = function universalLoader(req, res) {
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      return res.status(404).end();
    }
    const context = {};
    const markup = renderToString(React.createElement(
      Provider, { store },
      React.createElement(
        StaticRouter, { location: req.url, context },
        React.createElement(App)
      )
    ));

    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      return res.redirect(301, context.url);
    }
    // we're good, send the response
    const RenderedApp = htmlData.replace('{{SSR}}', markup);
    return res.send(RenderedApp);
  });
};
