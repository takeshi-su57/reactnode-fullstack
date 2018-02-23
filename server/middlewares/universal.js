const serialize = require('serialize-javascript');
const React = require('react');
const { Provider } = require('react-redux');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');

const api = require('../features/app/app.controller');
const storeSetup = require('../../app/store').default;
const App = require('../../app/containers/App').default;

module.exports = async (req, res, file) => {
  try {
    const context = {};
    const appData = await api.content(req);
    // const markup = renderToString(<Provider store={store}>
    //   <StaticRouter context={context} location={req.url}>
    //     <App />
    //   </StaticRouter>
    // </Provider>);
    const markup = renderToString(React.createElement(
      Provider,
      { store: storeSetup({ appData }) },
      React.createElement(
        StaticRouter,
        { location: req.url, context },
        React.createElement(App, null)
      )
    ));

    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      return res.redirect(301, context.url);
    }
    // we're good, send the response
    const RenderedApp = file.replace('{{PRELOADEDSTATE}}', serialize(appData))
      .replace('{{SSR}}', markup);

    return res.send(RenderedApp);
  } catch (err) {
    return res.status(500).send(`${err.toString()}\n${err.stack.toString()}`);
  }
};
