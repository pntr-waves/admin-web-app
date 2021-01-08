import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { tables } from "./reducer/tables";
import { dishes } from "./reducer/dishes";
import { users } from "./reducer/users";

export const configureStore = () => {
  const store = createStore(
    combineReducers({
      tables,
      dishes,
      users,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
