import React from 'react';
import Loadable from 'react-loadable';
import store, { injectAsyncReducer } from '../store';
import { Loading } from '../components';

import Home from './Home';

export { Home };

export const Login = Loadable({
  loader: () => import('./Login'),
  loading: () => <Loading />,
});

export const About = Loadable({
  loader: () => import('./About'),
  loading: () => <Loading />,
});

export const Register = Loadable({
  loader: () => import('./Register'),
  loading: () => <Loading />,
});

export const Profile = Loadable({
  loader: () => import('./Profile'),
  loading: () => <Loading />,
});

export const Examples = Loadable.Map({
  loading: () => <Loading />,
  loader: {
    Examples: () => import('./examples/Examples'),
    reducers: () => import('./examples/reducers'),
  },
  render(loaded, props) {
    const Ex = loaded.Examples.default;
    injectAsyncReducer(store, loaded.reducers.default);
    return <Ex {...props} />;
  },
});
