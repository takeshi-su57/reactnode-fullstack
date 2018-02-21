const React = require('react');
const { Provider } = require('react-redux');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');

const api = require('../features/app/app.controller');
const store = require('../../app/store').default;
const { default: App } = require('../../app/containers/App');

module.exports = async (req, res, file) => {
  const context = {};
  const appData = await api.content(req);
  // const markup = renderToString(<Provider store={store}>
  //   <StaticRouter context={context} location={req.url}>
  //     <App />
  //   </StaticRouter>
  // </Provider>);
  const markup = renderToString(React.createElement(
    Provider,
    { store },
    React.createElement(
      StaticRouter,
      { context, location: req.url },
      React.createElement(App, null)
    )
  ));

  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    return res.redirect(301, context.url);
  }
  // we're good, send the response
  const RenderedApp = file.replace('{{SSR}}', markup)
    .replace('{{preloadedState}}', JSON.stringify(appData).replace(/</g, '\\u003c'));

  return res.send(RenderedApp);
};
