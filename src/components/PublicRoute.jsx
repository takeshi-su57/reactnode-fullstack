import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer, AppConsumer } from '../contexts';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    render={props => (
      <AppConsumer>
        {({ appData }) => (
          <AuthConsumer>
            {auth =>
              auth.isLoggedIn ? <Redirect to="/" /> : <Component {...props} {...auth} {...rest} appData={appData} />
            }
          </AuthConsumer>
        )}
      </AppConsumer>
    )}
  />
);

export { PublicRoute };
