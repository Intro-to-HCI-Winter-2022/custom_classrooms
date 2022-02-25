import { ActionTypes } from '../actions';

const initialState = {
  seatNumber: -1,
  participants: null,
};

const ClassroomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_CLASSROOM_SEAT:
      return { seatNumber: action.payload, participants: state.participants };
    case ActionTypes.FETCH_CLASSROOM:
      return { seatNumber: state.seatNumber, participants: action.payload };
    default:
      return state;
  }
};

export default ClassroomReducer;
