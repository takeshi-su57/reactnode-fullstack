import React from 'react';
import Loadable from 'react-loadable';
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
