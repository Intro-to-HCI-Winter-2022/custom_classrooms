// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
});

export default rootReducer;
