import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { AppConsumer } from '../contexts';
import App from './App';
import { history } from '../services';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const initialState = {
    appData: {
      cultures: [
        { value: 'en-US', text: 'English - (en-US)', current: true },
        { value: 'fr-FR', text: 'French - (fr-FR)', current: false },
      ],
      content: {},
    },
    auth: { user: {}, authenticated: false },
  };

  ReactDOM.render(
    <AppConsumer value={initialState}>
      <Router history={history}>
        <App />
      </Router>
    </AppConsumer>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
