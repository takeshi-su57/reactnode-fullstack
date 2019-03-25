import { createBrowserHistory, createMemoryHistory } from 'history';

const isBrowser = typeof window !== 'undefined';

const history = isBrowser ? createBrowserHistory() : createMemoryHistory();

const navigate = route => history.push(route);

const parseQueryString = () => {
  const str = window.location.search;
  const objURL = {};

  str.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
    objURL[$1] = $3;
  });
  return objURL;
};

export { isBrowser, history, navigate, parseQueryString };
