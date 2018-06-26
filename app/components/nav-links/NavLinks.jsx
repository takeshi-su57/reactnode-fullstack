import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavLinks.scss';

const NavLinks = ({ small, links, match }) => (
  <div className={`list-group flex-column${small ? ' small' : ''}`}>
    {links.map(link => (
      <NavLink key={link.route} className="list-group-item" to={`${match.url}/${link.route}`} activeClassName="active">
        {link.description}
      </NavLink>
    ))}
  </div>
);

export { NavLinks };
