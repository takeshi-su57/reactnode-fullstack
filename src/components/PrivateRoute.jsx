import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer, AppConsumer } from '../contexts';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    render={props => (
      <AppConsumer>
        {({ appData }) => (
          <AuthConsumer>
            {auth =>
              auth.isLoggedIn ? (
                <Component {...props} {...auth} {...rest} appData={appData} />
              ) : (
                <Redirect to="/unauthorised" />
              )
            }
          </AuthConsumer>
        )}
      </AppConsumer>
    )}
  />
);

export { PrivateRoute };
