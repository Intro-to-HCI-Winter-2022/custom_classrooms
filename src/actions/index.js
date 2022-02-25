// keys for actiontypes
export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  SET_USER: 'SET_USER',
  CHANGE_CLASSROOM_SEAT: 'CHANGE_CLASSROOM_SEAT',
  FETCH_CLASSROOM: 'FETCH_CLASSROOM',
  UPDATE_CLASSROOM: 'UPDATE_CLASSROOM',
};

export function signinUser({ username, password }, history) {
  return (dispatch) => {
    // saving username as a token so that if page refreshes user is still signed in
    // only saving username as token because it's only frontend
    localStorage.setItem('custom_classrooms_token', username);
    history.push('/homepage');
    dispatch({ type: ActionTypes.AUTH_USER });
    dispatch({ type: ActionTypes.SET_USER, payload: username });
  };
}

export function signupUser({ email, password, username }, history) {
  return (dispatch) => {
    // saving username as a token so that if page refreshes user is still signed in
    // only saving username as token because it's only frontend
    localStorage.setItem('custom_classrooms_token', username);
    history.push('/homepage');
    dispatch({ type: ActionTypes.AUTH_USER });
    dispatch({ type: ActionTypes.SET_USER, payload: username });
  };
}

// deletes token from localstorage and deauths
export function signoutUser(history) {
  return (dispatch) => {
    history.push('/');
    localStorage.removeItem('custom_classrooms_token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
  };
}

// deletes token from localstorage and deauths
export function changeSeat(newSeat, newParticipantList) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.CHANGE_CLASSROOM_SEAT, payload: newSeat });
    // If we had backend, we could update the classroom in database
    dispatch({ type: ActionTypes.UPDATE_CLASSROOM, payload: newParticipantList });
  };
}

// fetching list of participants
export function getClassroom(classCode) {
  return (dispatch) => {
    // If we had backend, we could fetch a classroom from a database with a list of
    // active classrooms.
    dispatch({ type: ActionTypes.FETCH_CLASSROOM, payload: ['Professor Tim', 'Tymite', '', '', 'Mary', 'Tumy', ''] });
  };
}
