import { decode } from '../services';
import { ACCESS_TOKEN } from '../constants';

const isWindow = (typeof window !== 'undefined');
const token = isWindow ? localStorage.getItem(ACCESS_TOKEN) : '';

const user = token ? decode(token) : null;

const initialState = {
  auth: { user, authenticated: !!user },
};

export { initialState };
