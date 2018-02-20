import React from 'react';
import { NavLink } from 'react-router-dom';
import { logoutAction } from '../actions';
import { Cultures } from './Cultures';

import store from '../store';

export const Header = (props) => {
  const { auth, content } = props;
  return (
    <header className="header">
      <nav className="inner">
        <NavLink to="/">
          <img
            src="/favicon-32x32.png"
            alt="icon"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          &nbsp;{content.TITLE}
        </NavLink>
        <NavLink
          exact
          to="/"
          activeClassName="active"
        >
          {content.APP_NAV_HOME}
        </NavLink>
        <NavLink
          to="/about"
          activeClassName="active"
        >
          {content.APP_NAV_ABOUT}
        </NavLink>
        {auth.authenticated
          ? [
            <NavLink
              key="profile"
              to="/profile"
              activeClassName="active"
            >
              {auth.user.email}
            </NavLink>,
            <button
              key="logout"
              className="nav-link btn btn-link"
              onClick={() => {
                store.dispatch(logoutAction());
              }}
            >
              {content.APP_NAV_LOGOUT}
            </button>,
          ]
          : [
            <NavLink
              key="register"
              to="/register"
              activeClassName="active"
            >
              {content.APP_NAV_REGISTER}
            </NavLink>,
            <NavLink
              to="/login"
              key="login"
              activeClassName="active"
            >
              {content.APP_NAV_LOGIN}
            </NavLink>,
          ]}
        <Cultures />
      </nav>
    </header>
  );
};
