import * as ActionTypes from "../ActionTypes";

export const timeline = (
  state = {
    timeline: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_TIMELINE: {
      return { ...state, timeline: action.payload};
    }
    default: {
      return state;
    }
  }
};
