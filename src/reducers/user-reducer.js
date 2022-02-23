import { ActionTypes } from '../actions';

const initialState = {
  username: 'anonymous',
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { username: action.payload };
    default:
      return state;
  }
};

export default UserReducer;
