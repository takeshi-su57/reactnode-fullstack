import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { NavLinks } from '../../../../components';
import SlideShowContainer from './slideshow/SlideShowContainer';

export class ReactCastsExamples extends Component {
  reduxLinks = [
    {
      route: 'slideshow',
      description: 'Slideshow',
      component: SlideShowContainer
    }
  ];

  render() {
    return (
      <div className="row">
        <div className="col-md-1">
          <NavLinks small {...this.props} links={this.reduxLinks} />
        </div>
        <div className="col-md-11">
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
                <h3>Please select react casts example.</h3>
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}
