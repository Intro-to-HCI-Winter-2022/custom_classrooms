// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import characterReducer from '../slices/characterSlice';
import mapImagesReducer from '../slices/mapImagesSlice';
import statusReducer from '../slices/statusSlice';
import UserReducer from './user-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  mapImagesLoaded: mapImagesReducer,
  gameStatus: statusReducer,
  character: characterReducer,
  user: UserReducer,
});

export default rootReducer;
