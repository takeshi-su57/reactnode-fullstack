import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { PrivateRoute, PublicRoute, Header, Footer, SnackBar } from '../components';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import About from './About';

/* eslint-disable */
class App extends React.Component {
  render() {
    const { auth, appData } = this.props;
    return (
      <div>
        <Header
          auth={auth}
          content={appData.content}
        />
        <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <PublicRoute
              authenticated={auth.authenticated}
              path="/login"
              component={Login}
            />
            <PublicRoute
              authenticated={auth.authenticated}
              path="/register"
              component={Register}
            />
            <PrivateRoute
              authenticated={auth.authenticated}
              path="/profile"
              component={Profile}
            />
            <Route render={() => <h3>404</h3>} />
          </Switch>
        </div>
        <SnackBar />
        <Footer content={appData.content} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appData: state.appData,
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps)(App));
