import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { authenticated: true };
    case ActionTypes.DEAUTH_USER:
      return { authenticated: false };
    default:
      return state;
  }
};

export default AuthReducer;
