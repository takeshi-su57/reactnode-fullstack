import React, { Component } from 'react';

const AppContext = React.createContext();

export class AppProvider extends Component {
  state = {
    appData: window.__PRELOADEDSTATE__,
  };

  render() {
    const { children } = this.props;
    return <AppContext.Provider value={{ ...this.state }}>{children}</AppContext.Provider>;
  }
}

export const AppConsumer = AppContext.Consumer;
