import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import App from './App';
import setupStore from '../store';
import { history } from '../constants';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const initialState = {
    appData: {
      cultures: [{ value: 'en-US', text: 'English - (en-US)', current: true }, { value: 'fr-FR', text: 'French - (fr-FR)', current: false }],
      content: {},
    },
    auth: { user: {}, authenticated: false },
  };

  ReactDOM.render(<Provider store={setupStore(initialState)}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
