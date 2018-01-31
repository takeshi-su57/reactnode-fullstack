import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { NavLinks } from '../../../../components';
import { Conversion } from './currency-convertor';
import { ReduxCounter } from './counter';
import { ReduxForm } from './ReduxForm';
import { TodoComponent } from './Todo';
import { CourseManagement } from './course-management';
import { ShoppingCart } from './shopping-cart';
import { WizardFormPage } from './wizard-form';

export class ReduxExamples extends Component {
  reduxLinks = [
    { route: 'form', description: 'Forms', component: ReduxForm },
    {
      route: 'wizardform',
      description: 'Wizard Form',
      component: WizardFormPage
    },
    { route: 'counter', description: 'Counter', component: ReduxCounter },
    {
      route: 'currencyconvertor',
      description: 'Currency convertor',
      component: Conversion
    },
    {
      route: 'coursemanagement',
      description: 'Course management',
      component: CourseManagement
    },
    {
      route: 'todo',
      description: 'Todo',
      component: TodoComponent
    },
    {
      route: 'shoppingcart',
      description: 'Shopping Cart',
      component: ShoppingCart
    }
  ];

  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <NavLinks {...this.props} links={this.reduxLinks} />
        </div>
        <div className="col-md-9">
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
                <h3>Please select redux example.</h3>
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}
