import * as ActionTypes from "../ActionTypes";

export const tables = (
  state = {
    tables: [],
    errMess: null,
    isLoading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_TABLE: {
      return {
        ...state,
        tables: action.payload,
        errMess: null,
        isLoading: false,
      };
    }
    case ActionTypes.FAILED_TABLE: {
      return {
        ...state,
        tables: [],
        errMess: action.payload,
        isLoading: false,
      };
    }
    case ActionTypes.LOADING_TABLE: {
      return { ...state, tables: [], errMess: null, isLoading: true };
    }
    default: {
      return state;
    }
  }
};
