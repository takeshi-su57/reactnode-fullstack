import { ACCESS_TOKEN } from './constants';
import { history } from './history';
import { dataService } from './data.service';

const login = (usernameOrEmail, password) =>
  dataService
    .post('/api/auth/signin', {
      usernameOrEmail,
      password,
    })
    .then(successHandler);

const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  history.push('/');
};

const register = values => dataService.post('/api/auth/signup', values).then(successHandler);

const successHandler = res => res.data;

export { login, logout, register };
