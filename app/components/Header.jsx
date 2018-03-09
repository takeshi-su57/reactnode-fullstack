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
          &nbsp;{content.app_title}
        </NavLink>
        <NavLink
          exact
          to="/"
          activeClassName="active"
        >
          {content.app_nav_home}
        </NavLink>
        <NavLink
          to="/about"
          activeClassName="active"
        >
          {content.app_nav_about}
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
                store().dispatch(logoutAction());
              }}
            >
              {content.app_nav_logout}
            </button>,
          ]
          : [
            <NavLink
              key="register"
              to="/register"
              activeClassName="active"
            >
              {content.app_nav_register}
            </NavLink>,
            <NavLink
              to="/login"
              key="login"
              activeClassName="active"
            >
              {content.app_nav_login}
            </NavLink>,
          ]}
        <Cultures />
      </nav>
    </header>
  );
};
