import React from 'react';
import { Route } from 'react-router-dom';
import { AuthConsumer, AppConsumer } from '../contexts';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <AppConsumer>
          {({ appData }) => <AuthConsumer>{auth => <Component {...props} {...auth} appData={appData} />}</AuthConsumer>}
        </AppConsumer>
      );
    }}
  />
);

export { PublicRoute };
