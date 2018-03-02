/* eslint-disable */
// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '!file-loader?name=[name].[ext]!./images/android-chrome-192x192.png';
import '!file-loader?name=[name].[ext]!./images/android-chrome-512x512.png';
import '!file-loader?name=[name].[ext]!./images/apple-touch-icon.png';
import '!file-loader?name=[name].[ext]!./images/mstile-150x150.png';
import '!file-loader?name=[name].[ext]!./images/favicon-32x32.png';
import '!file-loader?name=[name].[ext]!./images/favicon-16x16.png';
import '!file-loader?name=[name].[ext]!./manifest.webmanifest';
import '!file-loader?name=[name].[ext]!./.htaccess';
import 'sanitize.css/sanitize.css';
import 'styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import storeSetup from './store';
import { history } from './constants';
import App from './containers/App';


function render() {
  const store = storeSetup({ appData: window.__PRELOADEDSTATE__ });
  ReactDOM[window.ssrEnabled ? 'hydrate' : 'render'](
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;
    render(NextApp);
  });
}

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}
