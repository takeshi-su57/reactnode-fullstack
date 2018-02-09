import React, { Component } from 'react';
import { Route } from 'react-router';
import { NavLinks } from '../../../../components';
import { FormsSync } from './components';

class EggheadExamples extends Component {
  exampleLinks = [
    {
      route: 'formssync',
      description: 'FormsSync',
      component: FormsSync
    }
  ];
  render() {
    return (
      <div className="row">
        <div className="col-md-1">
          <NavLinks small {...this.props} links={this.exampleLinks} />
        </div>
        <div className="col-md-11">
          {this.exampleLinks.map(link => (
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
                <h3>Please select egghead example.</h3>
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

export { EggheadExamples };
