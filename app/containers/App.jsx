import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import { AuthProvider, AuthConsumer } from '../contexts';
import { PublicRoute, Header, Footer } from '../components';
import Home from './Home';
import About from './About';

class App extends React.Component {
  render() {
    const { appData } = this.props;
    return (
      <AuthProvider>
        <AuthConsumer>
          {({ user, isLoggedIn }) => (
            <main role="main">
              <Header user={user} isLoggedIn={isLoggedIn} appData={appData} />
              <div className="container">
                <Switch>
                  <PublicRoute path="/" exact component={Home} appData={appData} />
                  <PublicRoute path="/about" component={About} />
                  <Route render={() => <h3>404</h3>} />
                </Switch>
              </div>
              <Footer content={appData.content} />
            </main>
          )}
        </AuthConsumer>
      </AuthProvider>
    );
  }
}

export default withRouter(App);
