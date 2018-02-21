import { decode } from '../services';
import { ACCESS_TOKEN } from '../constants';

const token = (typeof window !== 'undefined') ? localStorage.getItem(ACCESS_TOKEN) : '';

const user = token ? decode(token) : null;

const initialState = {
  appData: null,
  auth: { user, authenticated: !!user },
};

export { initialState };
