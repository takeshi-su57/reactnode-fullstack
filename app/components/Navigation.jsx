import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { logoutAction } from '../actions';
import { Cultures } from './Cultures';

import store from '../store';

export class Navigation extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { auth, content } = this.props;
    return (
      <nav className="navbar navbar-expand-sm navbar-light top-nav">
        <NavLink className="navbar-brand" to="/">
          <img
            src="icon-72x72.png"
            alt="icon"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          &nbsp;{content.TITLE}
        </NavLink>
        <button
          onClick={this.toggle}
          className={'navbar-toggler ' + (this.state.isOpen ? '' : 'collapsed')}
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={
            'collapse navbar-collapse ' + (this.state.isOpen ? 'show' : '')
          }
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link"
                to="/"
                activeClassName="active"
              >
                {content.APP_NAV_HOME}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/examples"
                activeClassName="active"
              >
                {content.APP_NAV_EXAMPLES}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/about"
                activeClassName="active"
              >
                {content.APP_NAV_ABOUT}
              </NavLink>
            </li>

            <Cultures />
          </ul>
          <ul className="navbar-nav ml-auto">
            {auth.authenticated
              ? [
                <li className="nav-item" key="profile">
                  <NavLink
                    className="nav-link"
                    to="/profile"
                    activeClassName="active"
                  >
                    {auth.user.email}
                  </NavLink>
                </li>,
                <li className="nav-item" key="logout">
                  <a
                    className="nav-link"
                    href=""
                    onClick={() => {
                      store.dispatch(logoutAction());
                    }}
                  >
                    {content.APP_NAV_LOGOUT}
                  </a>
                </li>
              ]
              : [
                <li className="nav-item" key="login">
                  <NavLink
                    className="nav-link"
                    to="/login"
                    activeClassName="active"
                  >
                    {content.APP_NAV_LOGIN}
                  </NavLink>
                </li>,
                <li className="nav-item" key="register">
                  <NavLink
                    className="nav-link"
                    to="/register"
                    activeClassName="active"
                  >
                    {content.APP_NAV_REGISTER}
                  </NavLink>
                </li>
              ]}
          </ul>
        </div>
      </nav>
    );
  }
}
