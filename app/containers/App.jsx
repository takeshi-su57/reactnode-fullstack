import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Loadable from 'react-loadable';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import store, { injectAsyncReducer } from '../store';

import { PrivateRoute, PublicRoute, Header, Footer, Loading } from '../components';
import Home from './Home';
import { loadAppData } from '../actions';

const Login = Loadable({
  loader: () => import('./Login'),
  loading: () => <Loading />,
});

const About = Loadable({
  loader: () => import('./About'),
  loading: () => <Loading />,
});

const Register = Loadable({
  loader: () => import('./Register'),
  loading: () => <Loading />,
});

const Profile = Loadable({
  loader: () => import('./Profile'),
  loading: () => <Loading />,
});

const Examples = Loadable.Map({
  loading: () => <Loading />,
  loader: {
    Examples: () => import('./examples/Examples'),
    reducers: () => import('./examples/reducers'),
  },
  render(loaded, props) {
    const Examples = loaded.Examples.default;
    injectAsyncReducer(store, loaded.reducers.default);
    return <Examples {...props} />;
  },
});

class App extends React.Component {
  componentDidMount() {
    this.props.loadAppData();
  }

  render() {
    const timeout = { enter: 300, exit: 200 };
    const currentKey = window.location.pathname.split('/')[1] || '/';
    return !this.props.appData ? (
      <Loading />
    ) : (
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
                  <Route path="/" exact component={Home} />
                  <Route path="/about" exact component={About} />
                  <Route path="/examples" component={Examples} />
                  <PublicRoute
                    authenticated={this.props.auth.authenticated}
                    path="/login"
                    component={Login}
                  />
                  <PublicRoute
                    authenticated={this.props.auth.authenticated}
                    path="/register"
                    component={Register}
                  />
                  <PrivateRoute
                    authenticated={this.props.auth.authenticated}
                    path="/profile"
                    component={Profile}
                  />
                  <Route render={() => <h3>404</h3>} />
                </Switch>
              </div>
            </CSSTransition>
          </TransitionGroup>
          <Footer />
        </div>
      );
  }
}

const mapStateToProps = (state) => ({
  appData: state.appData,
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  loadAppData() {
    dispatch(loadAppData());
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
