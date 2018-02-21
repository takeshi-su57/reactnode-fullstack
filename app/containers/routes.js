import loadable from 'loadable-components';

import Home from './Home';
export { Home };
export const Login = loadable(() => import('./Login'));
export const About = loadable(() => import('./About'));
export const Register = loadable(() => import('./Register'));
export const Profile = loadable(() => import('./Profile'));
