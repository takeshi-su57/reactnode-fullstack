import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

const history = (typeof window !== 'undefined') ? createBrowserHistory() : createMemoryHistory();

export { history };

