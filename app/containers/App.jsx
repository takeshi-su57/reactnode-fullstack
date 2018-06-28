import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import { PrivateRoute, PublicRoute, Header, Footer, SnackBar } from '../components';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import About from './About';
import { AuthProvider, AuthConsumer } from '../contexts';

/* eslint-disable */
class App extends React.Component {
  render() {
    const { auth, appData } = this.props;
    return (
      <AuthProvider>
        {({ setAuth }) => (
          <AuthConsumer>
            {({ user, authenticated }) => (
              <div>
                <Header
                  user={user}
                  authenticated={authenticated}
                  appData={appData}
                />
                <div className="container">
                  <Switch>
                    <PublicRoute path="/" exact component={Home} appData={appData} />
                    <PublicRoute path="/about" component={About} />
                    <PublicRoute path="/login" component={Login} authenticated={authenticated} />
                    <PublicRoute path="/register" component={Register} authenticated={authenticated} />
                    <PrivateRoute path="/profile" component={Profile} authenticated={authenticated} />
                    <Route render={() => <h3>404</h3>} />
                  </Switch>
                </div>
                {/* <SnackBar /> */}
                <Footer content={appData.content} />
              </div>
            )}
          </AuthConsumer>
        )}
      </AuthProvider>
    );
  }
}

export default withRouter(App);
