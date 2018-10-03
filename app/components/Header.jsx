import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthConsumer } from '../contexts';

export class Header extends Component {
  state = {
    isCollapsed: false,
    languageExpanded: false,
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      isCollapsed: !prevState.isCollapsed,
    }));
  };

  expandLanguage = () =>
    this.setState(prevState => ({
      languageExpanded: !prevState.languageExpanded,
    }));

  render() {
    const { user, isLoggedIn, appData } = this.props;
    const { cultures, content } = appData;
    const { isCollapsed, languageExpanded } = this.state;

    return (
      <AuthConsumer>
        {context => (
          <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
              <NavLink className="navbar-brand" target="_blank" rel="noopener" to="/" exact>
                <img
                  src="/assets/favicon-32x32.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="Logo"
                />
                &nbsp;
                {content.app_title}
              </NavLink>
              <button
                className={`navbar-toggler ${isCollapsed ? 'collapsed' : ''}`}
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-label="Toggle navigation"
                onClick={this.toggleMenu}
                aria-expanded={!isCollapsed}
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className={`collapse navbar-collapse ${isCollapsed ? 'collapse' : 'show'}`} id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink exact to="/" className="nav-link" activeClassName="active">
                      {content.app_nav_home}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink exact to="/about" className="nav-link" activeClassName="active">
                      {content.app_nav_about}
                    </NavLink>
                  </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <div className={`dropdown ${languageExpanded ? 'show' : ''}`}>
                      <a
                        href="javascript:void(0);"
                        className="nav-link dropdown-toggle"
                        role="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded={languageExpanded}
                        onClick={this.expandLanguage}
                      >
                        {cultures.filter(x => x.current)[0].text}
                      </a>
                      <div
                        className={`dropdown-menu ${languageExpanded ? 'show' : ''}`}
                        aria-labelledby="dropdownMenuButton"
                      >
                        {cultures.map(c => (
                          <form
                            key={c.value}
                            action="/api/setlanguage"
                            method="post"
                            className={c.current ? 'active' : ''}
                          >
                            <button
                              id={c.value}
                              name="culture"
                              aria-expanded={languageExpanded}
                              value={c.value}
                              type="submit"
                              className="dropdown-item"
                            >
                              {c.text}
                            </button>
                          </form>
                        ))}
                      </div>
                    </div>
                  </li>

                  {isLoggedIn
                    ? [
                        <li className="nav-item" key="profile">
                          <a role="button" href="javascript:void(0)" className="nav-link" onClick={context.profile}>
                            {user && user.profile.email}
                          </a>
                        </li>,
                        <li className="nav-item" key="logout">
                          <a href="javascript:void(0)" className="nav-link" onClick={context.logout}>
                            {content.app_nav_logout}
                          </a>
                        </li>,
                      ]
                    : [
                        <li className="nav-item" key="register">
                          <a href="javascript:void(0)" className="nav-link" onClick={context.register}>
                            {content.app_nav_register}
                          </a>
                        </li>,
                        <li className="nav-item" key="login">
                          <a href="javascript:void(0)" className="nav-link" onClick={context.login}>
                            {content.app_nav_login}
                          </a>
                        </li>,
                      ]}
                </ul>
              </div>
            </nav>
          </header>
        )}
      </AuthConsumer>
    );
  }
}
