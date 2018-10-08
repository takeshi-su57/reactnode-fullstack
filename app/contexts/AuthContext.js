import React, { Component } from 'react';

const AuthContext = React.createContext();

export class AuthProvider extends Component {
  state = {
    user: null,
    isLoggedIn: false,
    login: () => this.authService.login(),
    register: () => this.authService.register(),
    logout: () => this.authService.logout(),
    profile: () => this.authService.profile(),
  };

  isMounted = false;

  authService = null;

  componentDidMount() {
    this.isMounted = true;
    // This is to avoid compiling auth service which uses oidc-client and windows reference, which breaks compiling with node.
    /* eslint-disable */
    const { AuthService } = require('../services/auth.service');
    const auth = new AuthService();
    auth.userManager.getUser().then(user => {
      auth.user = user;
      if (this.isMounted) {
        this.setState(prevState => ({
          user,
          isLoggedIn: auth.isLoggedIn(),
        }));
      }
      this.authService = auth;
    });
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render() {
    const { children } = this.props;
    return <AuthContext.Provider value={{ ...this.state }}>{children}</AuthContext.Provider>;
  }
}

export const AuthConsumer = AuthContext.Consumer;
