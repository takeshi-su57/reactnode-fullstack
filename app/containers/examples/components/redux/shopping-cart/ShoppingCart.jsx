import React from 'react';
import store from '../../../../../store';

import { getAllProducts } from './actions';

import ProductsContainer from './containers/ProductsContainer';
import CartContainer from './containers/CartContainer';

store.dispatch(getAllProducts());

const ShoppingCart = () => (
  <div>
    <h2>Shopping Cart Example</h2>
    <hr />
    <ProductsContainer />
    <hr />
    <CartContainer />
  </div>
);

export { ShoppingCart };
