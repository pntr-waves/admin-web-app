import * as ActionTypes from "../ActionTypes";

export const users = (
  state = {
    users: [],
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_USERS: {
      return { ...state, users: action.payload, errMess: null };
    }
    case ActionTypes.FAILED_USERS: {
      return { ...state, users: [], errMess: action.payload };
    }
    default: {
      return state;
    }
  }
};
