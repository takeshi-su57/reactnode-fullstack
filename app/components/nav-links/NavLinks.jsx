import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavLinks.scss';

const NavLinks = props =>  
     (
      <div className={"list-group flex-column" + (props.small ? ' small' : '')}>
        {props.links.map(link => (
            <NavLink
              key={link.route}
              className="list-group-item"
              to={`${props.match.url}/${link.route}`}
              activeClassName="active"
            >
              {link.description}
            </NavLink>
        ))}
      </div>
    );
  
    export { NavLinks };