import React from 'react';
import { NavLink, Route } from 'react-router-dom';

import CrudShop from './examples/crud-shop/CrudShop';
import TableExample from './examples/table/TableExample';
import Form from './examples/form/FormExample';
import Misc from './examples/misc/Misc';

const Examples = ({ appData, match: { url } }) => {
  return (
    <>
      <h1>{appData.content.app_nav_examples}</h1>
      <ul className="nav">
        {[
          { route: 'crud-shop', text: 'Crud shop' },
          { route: 'table-example', text: 'Table example' },
          { route: 'form', text: 'Form' },
          { route: 'misc', text: 'Misc' },
        ].map(menu => (
          <li className="nav-item" key={menu.route}>
            <NavLink exact to={`${url}/${menu.route}`} className="nav-link" activeClassName="active">
              {menu.text}
            </NavLink>
          </li>
        ))}
      </ul>
      <Route exact path={`${url}/`} render={() => <h2>Examples home</h2>} />
      <Route path={`${url}/crud-shop`} component={CrudShop} />
      <Route path={`${url}/table-example`} component={TableExample} />
      <Route path={`${url}/form`} component={Form} />
      <Route path={`${url}/misc`} component={Misc} />
    </>
  );
};

export default Examples;
