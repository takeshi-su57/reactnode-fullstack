import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import { history } from '../services';

it('renders without crashing', () => {
  const div = document.createElement('div');
  /* eslint-disable */
  window.__PRELOADEDSTATE__ = {
    cultures: [
      { value: 'en-US', text: 'English - (en-US)', current: true },
      { value: 'fr-FR', text: 'French - (fr-FR)', current: false },
    ],
    content: {
      "app_title": "NgNode",
      "app_description": "A Single Page Application built using Angular and Nodejs",
      "app_repo_url": "https://github.com/asadsahi/ngnode-fullstack",
      "app_nav_home": "Home",
      "app_nav_about": "About",
      "app_nav_login": "Login",
      "app_nav_logout": "Logout",
      "app_nav_register": "Register",
      "app_nav_admin": "Admin",
      "app_nav_examples": "Examples"
    },
  };

  ReactDOM.render(
    <Router history={history}>
      <App />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
