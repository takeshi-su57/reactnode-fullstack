import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { NavLinks } from '../../components';

import {
  ReduxExamples,
  ReactCastsExamples,
  EggheadExamples,
  MovieSearch,
  ChatExamples,
  GameExamples
} from './components';

export default class Examples extends Component {
  exampleLinks = [
    {
      route: 'reactcasts',
      description: 'ReactCasts',
      component: ReactCastsExamples
    },
    {
      route: 'reduxexamples',
      description: 'Redux',
      component: ReduxExamples
    },
    {
      route: 'eggheadexamples',
      description: 'Egghead',
      component: EggheadExamples
    },
    {
      route: 'moviesearch',
      description: 'Movie',
      component: MovieSearch
    },
    {
      route: 'chat',
      description: 'Chat',
      component: ChatExamples
    },
    {
      route: 'games',
      description: 'Games',
      component: GameExamples
    },
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
                <h3>Please select an example.</h3>
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}
