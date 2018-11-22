import React from 'react';
import { NavLink } from 'react-router-dom';
import { PublicRoute } from '../../../components/PublicRoute';
import Customers from './Customers';
import ProductCategories from './ProductCategories';
import Orders from './Orders';
import Products from './Products';

export default function CrudShop({ match: { url } }) {
  const ROUTES = [
    { route: 'customers', text: 'Customers', component: Customers },
    { route: 'product-categories', text: 'Product categories', component: ProductCategories },
    { route: 'orders', text: 'Orders', component: Orders },
    { route: 'products', text: 'Products', component: Products },
  ];
  return (
    <>
      <ul className="nav">
        {ROUTES.map(menu => (
          <li className="nav-item" key={menu.route}>
            <NavLink exact to={`${url}/${menu.route}`} className="nav-link" activeClassName="active">
              {menu.text}
            </NavLink>
          </li>
        ))}
      </ul>

      {ROUTES.map(r => {
        return <PublicRoute key={r.route} path={`${url}/${r.route}`} component={r.component} />;
      })}
    </>
  );
}
