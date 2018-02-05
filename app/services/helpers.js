import { decode } from './jwt-decode';
import { ACCESS_TOKEN } from '../constants';

export const storeAuth = (token) => {
  localStorage.setItem(ACCESS_TOKEN, token);
  return decode(token);
};

export const parseQueryString = () => {
  const str = window.location.search;
  const objURL = {};

  str.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
    objURL[$1] = $3;
  });
  return objURL;
};
