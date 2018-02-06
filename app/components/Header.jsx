import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { logoutAction } from '../actions';
import { Cultures } from './Cultures';

import store from '../store';

export class Header extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { auth, content } = this.props;
    return (
      <nav className="navbar navbar-expand-sm navbar-light top-nav">
        <NavLink className="navbar-brand" to="/">
          <img
            src="/favicon-32x32.png"
            alt="icon"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          &nbsp;{content.TITLE}
        </NavLink>
        <button
          onClick={this.toggle}
          className={`navbar-toggler ${this.state.isOpen ? '' : 'collapsed'}`}
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
            `collapse navbar-collapse ${this.state.isOpen ? 'show' : ''}`
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
                <i className="fa fa-home"></i>&nbsp;
                {content.APP_NAV_HOME}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/examples"
                activeClassName="active"
              >
                <i className="fa fa-flask"></i>&nbsp;
                {content.APP_NAV_EXAMPLES}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/about"
                activeClassName="active"
              >
                <i className="fa fa-info  "></i>&nbsp;
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
                    <i className="fa fa-user"></i>&nbsp;
                    {auth.user.email}
                  </NavLink>
                </li>,
                <li className="nav-item" key="logout">
                  <button
                    className="nav-link btn btn-link"
                    onClick={() => {
                      store.dispatch(logoutAction());
                    }}
                  >
                    <i className="fa fa-sign-out"></i>&nbsp;
                    {content.APP_NAV_LOGOUT}
                  </button>
                </li>,
              ]
              : [
                <li className="nav-item" key="register">
                  <NavLink
                    className="nav-link"
                    to="/register"
                    activeClassName="active"
                  >
                    <i className="fa fa-user-plus"></i>&nbsp;
                    {content.APP_NAV_REGISTER}
                  </NavLink>
                </li>,
                <li className="nav-item" key="login">
                  <NavLink
                    className="nav-link"
                    to="/login"
                    activeClassName="active"
                  >
                    <i className="fa fa-sign-in"></i>&nbsp;
                    {content.APP_NAV_LOGIN}
                  </NavLink>
                </li>,
              ]}
          </ul>
        </div>
      </nav>
    );
  }
}
