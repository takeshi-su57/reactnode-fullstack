import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// App Reducers
import appData from './app.reducer';
import auth from './login.reducer';
import register from './register.reducer';
import profile from './profile.reducer';
import notify from './notify.reducer';
// https://stackoverflow.com/questions/32968016/how-to-dynamically-load-reducers-for-code-splitting-in-a-redux-application

const rootReducer = asyncReducers =>
  combineReducers({
    router: routerReducer,
    appData,
    auth,
    register,
    profile,
    notify,
    ...asyncReducers,
  });

export { rootReducer };
