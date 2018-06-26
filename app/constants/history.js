import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import { isBrowser } from '../services/helpers';

const history = isBrowser ? createBrowserHistory() : createMemoryHistory();

export { history };
