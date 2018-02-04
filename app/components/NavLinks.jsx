import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class NavLinks extends Component {
  render() {
    return (
      <ul className="nav flex-column">
        {this.props.links.map(link => (
          <li className="nav-item" key={link.route}>
            <NavLink
              className="nav-link"
              to={`${this.props.match.url}/${link.route}`}
              activeClassName="active"
            >
              {link.description}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
}
