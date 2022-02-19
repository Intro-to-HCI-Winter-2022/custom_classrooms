// keys for actiontypes
export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
};

export function signinUser({ email, password }, history) {
  return (dispatch) => {
    history.push('/homepage');
    dispatch({ type: ActionTypes.AUTH_USER });
  };
}

export function signupUser({ email, password, username }, history) {
  return (dispatch) => {
    history.push('/homepage');
    dispatch({ type: ActionTypes.AUTH_USER });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    history.push('/');
    dispatch({ type: ActionTypes.DEAUTH_USER });
  };
}
