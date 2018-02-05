import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';

// App Reducers
import appData from './app.reducer';
import auth from './login.reducer';
import register from './register.reducer';
import profile from './profile.reducer';
// https://stackoverflow.com/questions/32968016/how-to-dynamically-load-reducers-for-code-splitting-in-a-redux-application

const rootReducer = (asyncReducers) => combineReducers({
  form: reduxFormReducer, // mounted under "form"
  router: routerReducer,
  appData,
  auth,
  register,
  profile,
  ...asyncReducers,
});

export { rootReducer };
