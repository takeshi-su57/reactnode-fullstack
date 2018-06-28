import React, { Component } from 'react';
import { getAuth, setAuth, clearAuth, history } from '../services';

const AuthContext = React.createContext();

export class AuthProvider extends Component {
  state = {
    user: getAuth() || null,
    authenticated: !!getAuth(),
    setUser: token => {
      const user = setAuth(token);
      this.setState({ user, authenticated: !!user });
    },
    logout: () => {
      clearAuth();
      this.setState({ user: null, authenticated: false });
      history.push('/login');
    },
  };

  render() {
    const { user, authenticated, setUser, logout } = this.state;
    const { children } = this.props;
    return (
      <AuthContext.Provider value={{ user, authenticated, setUser, logout }}>
        {children({ setUser: this.setUser })}
      </AuthContext.Provider>
    );
  }
}

export const AuthConsumer = AuthContext.Consumer;
