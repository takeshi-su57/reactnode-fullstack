import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { NavLinks } from '../../../../components';
import { PlayStar } from './play-star';

class GameExamples extends Component {
  reduxLinks = [
    { route: 'playstar', description: 'Play star', component: PlayStar },
  ];

  render() {
    return (
      <div className="row">
        <div className="col-md-2">
          <NavLinks {...this.props} links={this.reduxLinks} />
        </div>
        <div className="col-md-10">
          {this.reduxLinks.map(link => (
            <Route
              key={link.route}
              path={`${this.props.match.url}/${link.route}`}
              component={link.component}
            />
          ))}
          <Route
            exact
            path={this.props.match.url}
            render={() => (
              <div>
                <h3>Please select game example.</h3>
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

export { GameExamples };
