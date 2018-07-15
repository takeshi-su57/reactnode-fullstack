import React from 'react';
import { NavLink } from 'react-router-dom';
import { AuthConsumer } from '../contexts';
import { Cultures } from './Cultures';

export const Header = props => {
  const { user, authenticated, appData } = props;
  const { cultures, content } = appData;
  return (
    <AuthConsumer>
      {context => (
        <header className="header">
          <nav>
            <NavLink to="/" exact>
              <img src="/favicon-32x32.png" alt="icon" width="30" height="30" />
              &nbsp;{content.app_title}
            </NavLink>
            <NavLink exact to="/" activeClassName="active">
              {content.app_nav_home}
            </NavLink>
            <NavLink to="/about" activeClassName="active">
              {content.app_nav_about}
            </NavLink>
            {authenticated
              ? [
                  <NavLink key="profile" to="/profile" activeClassName="active">
                    {user.email}
                  </NavLink>,
                  <a key="logout" href="javascript:void(0)" onClick={() => context.logout()}>
                    {content.app_nav_logout}
                  </a>,
                ]
              : [
                  <NavLink key="register" to="/register" activeClassName="active">
                    {content.app_nav_register}
                  </NavLink>,
                  <NavLink to="/login" key="login" activeClassName="active">
                    {content.app_nav_login}
                  </NavLink>,
                ]}
            <div className="culture-form">
              <Cultures cultures={cultures} />
            </div>
          </nav>
        </header>
      )}
    </AuthConsumer>
  );
};
