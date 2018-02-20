import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { PrivateRoute, PublicRoute, Header, Footer, Loading, SnackBar } from '../components';
import * as routes from './routes';
import { loadAppData } from '../actions';

class App extends React.Component {
  componentDidMount() {
    this.props.loadAppData();
  }

  render() {
    return !this.props.appData ? <Loading /> : (
      <div>
        <Header
          auth={this.props.auth}
          content={this.props.appData.content}
        />
        <div className="container">
          <Switch>
            <Route path="/" exact component={routes.Home} />
            <Route path="/about" exact component={routes.About} />
            <PublicRoute
              authenticated={this.props.auth.authenticated}
              path="/login"
              component={routes.Login}
            />
            <PublicRoute
              authenticated={this.props.auth.authenticated}
              path="/register"
              component={routes.Register}
            />
            <PrivateRoute
              authenticated={this.props.auth.authenticated}
              path="/profile"
              component={routes.Profile}
            />
            <Route render={() => <h3>404</h3>} />
          </Switch>
        </div>
        <SnackBar />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appData: state.appData,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  loadAppData() {
    dispatch(loadAppData());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
