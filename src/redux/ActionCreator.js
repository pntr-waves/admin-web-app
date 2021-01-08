import axios from "axios";
import * as ActionTypes from "./ActionTypes";
import {
  get_table_url,
  get_dishes_url,
  get_users_url,
} from "../shared/url/baseUrl";

//get all tables

export const fetchTables = () => async (dispatch) => {
  dispatch(loadingTables());

  return await axios
    .get(get_table_url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => dispatch(addTables(res.data)))
    .catch((error) => dispatch(failedTables(error.response)));
};

export const addTables = (tables) => {
  return {
    type: ActionTypes.ADD_TABLE,
    payload: tables,
  };
};
export const failedTables = (errMess) => {
  return {
    type: ActionTypes.FAILED_TABLE,
    payload: errMess,
  };
};

export const loadingTables = () => {
  return {
    type: ActionTypes.LOADING_TABLE,
  };
};

//get all users

export const fetchUser = () => async (dispatch) => {
  return axios
    .get(get_users_url)
    .then((res) => {
      dispatch(addUsers(res.data));
    })
    .catch((error) => {
      dispatch(failedUsers(error.response));
    });
};

export const addUsers = (users) => {
  return {
    type: ActionTypes.ADD_USERS,
    payload: users,
  };
};

export const failedUsers = (errMess) => {
  return {
    type: ActionTypes.FAILED_USERS,
    payload: errMess,
  };
};
//get all dishes

export const fetchDishes = () => async (dispatch) => {
  return axios
    .get(get_dishes_url)
    .then((res) => {
      dispatch(addDishes(res.data));
    })
    .catch((error) => {
      dispatch(failedDishes(error.response));
    });
};

export const addDishes = (dishes) => {
  return {
    type: ActionTypes.ADD_DISHES,
    payload: dishes,
  };
};

export const failedDishes = (errMess) => {
  return {
    type: ActionTypes.FAILED_DISHES,
    payload: errMess,
  };
};
