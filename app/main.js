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
import '!file-loader?name=[name].[ext]!./site.webmanifest';
import '!file-loader?name=[name].[ext]!./.htaccess';
import 'sanitize.css/sanitize.css';
import 'styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { AppProvider, AppConsumer } from './contexts';
import { history } from './services';
import App from './containers/App';

function render() {
  ReactDOM[window.ssrEnabled ? 'hydrate' : 'render'](
    <AppProvider value={{ appData: window.__PRELOADEDSTATE__ }}>
      <AppConsumer>
        {({ appData }) => <Router history={history}><App appData={appData} /></Router>}
      </AppConsumer>
    </AppProvider>,
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
