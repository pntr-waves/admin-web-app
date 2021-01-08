import * as ActionTypes from "../ActionTypes";

export const dishes = (
  state = {
    dishes: [],
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES: {
      return { ...state, dishes: action.payload, errMess: null };
    }
    case ActionTypes.FAILED_DISHES: {
      return { ...state, errMess: action.payload };
    }
    default: {
      return state;
    }
  }
};
