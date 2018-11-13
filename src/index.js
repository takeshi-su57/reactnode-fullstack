/* eslint-disable */
// import '!file-loader?name=[name].[ext]!./assets/images/favicon.ico';
// import '!file-loader?name=[name].[ext]!./assets/images/android-chrome-192x192.png';
// import '!file-loader?name=[name].[ext]!./assets/images/android-chrome-512x512.png';
// import '!file-loader?name=[name].[ext]!./assets/images/apple-touch-icon.png';
// import '!file-loader?name=[name].[ext]!./assets/images/mstile-150x150.png';
// import '!file-loader?name=[name].[ext]!./assets/images/favicon-32x32.png';
// import '!file-loader?name=[name].[ext]!./assets/images/favicon-16x16.png';

// // Other images
// import '!file-loader?name=[name].[ext]!./assets/images/nodejs.png';
// import '!file-loader?name=[name].[ext]!./assets/images/react.png';

import './styles/index.scss';

import * as moment from 'moment';
// Add more locales
import '../node_modules/moment/locale/en-gb';
moment.locale(['en-GB']);

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './containers/App';
import { history } from './services';

// Post logout redirect logic*-+9/
if (window.location.href.indexOf('?postLogout=true') > 0) {
  const { AuthService } = require('./services/auth.service');
  var authService = new AuthService();
  authService.signoutRedirectCallback().then(() => {
    // clear the query string
    history.push('/', '');
  });
}

function render() {
  ReactDOM[window.ssrEnabled ? 'hydrate' : 'render'](
    <Router history={history}>
      <App />
    </Router>,
    document.getElementById('app')
  );
}

render();

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App');
    console.clear();
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
