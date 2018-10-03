import React, { Component } from 'react';
import { STS_URL } from '../services';

const AuthContext = React.createContext();

export class AuthProvider extends Component {
  state = {
    user: null,
    isLoggedIn: false,
    login: () => {
      this.authService.login();
    },
    register: () => {
      this.authService.register();
    },
    logout: () => {
      this.authService.logout();
    },
    profile: () => {
      this.authService.profile();
    },
  };

  componentDidMount() {
    /* eslint-disable */
    // This is to avoid compiling auth service which uses oidc-client and windows reference, which breaks compiling with node.
    const { AuthService } = require('../services/auth.service');
    this.authService = new AuthService(STS_URL);
    this.authService.userManager.getUser().then(user => {
      if (user) {
        this.setState(prevState => {
          return {
            user,
            isLoggedIn: this.authService.isLoggedIn()
          };
        });
      }
    });
  }

  authService;

  render() {
    const { children } = this.props;
    return (
      <AuthContext.Provider value={{ ...this.state }}>
        {children}
      </AuthContext.Provider>
    );
  }
}

export const AuthConsumer = AuthContext.Consumer;
