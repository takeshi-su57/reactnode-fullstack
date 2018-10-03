import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from '../contexts';

const PublicRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isLoggedIn ? (
        <AuthConsumer>{context => <Component {...props} {...rest} context={context} />}</AuthConsumer>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export { PublicRoute };
