const React = require('react');
const _ = require('lodash');
const { Provider } = require('react-redux');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');

const api = require('../features/app/app.controller');
const storeSetup = require('../../app/store').default;
const App = require('../../app/containers/App').default;

module.exports = async (req, res, file) => {
  try {
    let appData = await api.content(req);

    if (req.query.access_token) {
      appData = _.extend(appData, { access_token: req.query.access_token });
    }

    const context = {};
    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      return res.redirect(301, context.url);
    }

    const initialMarkup = renderToString(React.createElement(
      Provider,
      { store: storeSetup({ appData }) },
      React.createElement(
        StaticRouter,
        { location: req.url, context },
        React.createElement(App, null)
      )
    ));

    // we're good, send the response
    const RenderedApp = file.replace('{{PRELOADEDSTATE}}', `<script>
      window.__PRELOADEDSTATE__ = ${JSON.stringify(appData).replace(/</g, '\\u003c')}
      window.ssrEnabled = ${true}
      </script>`).replace('{{SSR}}', `<div id="app">${initialMarkup}</div>`)
      .replace(/{{app_title}}/g, appData.content.app_title)
      .replace(/{{app_description}}/g, appData.content.app_description);

    return res.send(RenderedApp);
  } catch (err) {
    return res.status(500).send(`${err.toString()}\n${err.stack.toString()}`);
  }
};
