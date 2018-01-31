import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createMemoryHistory';
import App from './containers/App';

export function render(req, store, context) {
  return renderToString(<Provider store={store}>
    <ConnectedRouter
      history={createHistory()}
      location={req.url}
      context={context}
    >
      <App />
    </ConnectedRouter>
  </Provider>);
}

export function renderHead(context) {
  return context.head.map((h) => renderToStaticMarkup(h)).join('');
}
