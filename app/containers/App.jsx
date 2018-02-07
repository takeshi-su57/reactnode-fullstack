import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { PrivateRoute, PublicRoute, Header, Footer, Loading, SnackBar } from '../components';
import * as routes from './routes';
import { loadAppData } from '../actions';

class App extends React.Component {
  componentDidMount() {
    this.props.loadAppData();
  }

  render() {
    const timeout = { enter: 300, exit: 200 };
    const currentKey = window.location.pathname.split('/')[1] || '/';
    return !this.props.appData ? <Loading /> : (
      <div>
        <Header
          auth={this.props.auth}
          content={this.props.appData.content}
        />
        <TransitionGroup component="main" className="page-main">
          <CSSTransition
            key={currentKey}
            timeout={timeout}
            classNames="fade"
            appear
          >
            <div className="container-fluid">
              <Switch>
                <Route path="/" exact component={routes.Home} />
                <Route path="/about" exact component={routes.About} />
                <Route path="/examples" component={routes.Examples} />
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
          </CSSTransition>
        </TransitionGroup>
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
