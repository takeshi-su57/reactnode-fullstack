import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { NavLinks } from '../../../../components';
import { ChatWidget1 } from './widget1';
import { ChatWidget2 } from './widget2';


export class ChatExamples extends Component {
  reduxLinks = [
    {
      route: 'widget1',
      description: 'Widget 1',
      component: ChatWidget1
    },
    {
      route: 'widget2',
      description: 'Widget 2',
      component: ChatWidget2
    }
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
                <h3>Please select a chat example.</h3>
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}
