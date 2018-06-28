import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from '../contexts';

const PublicRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !authenticated ? (
        <AuthConsumer>{context => <Component {...props} {...rest} context={context} />}</AuthConsumer>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export { PublicRoute };
