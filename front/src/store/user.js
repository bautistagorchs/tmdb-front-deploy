import { createAction, createReducer } from "@reduxjs/toolkit";
//import { message } from "antd";

export const setUser = createAction("SET_USER");
const initialState = {
  email: null,
  name: null,
  last_name: null,
  favorites: [],
};

const userReducer = createReducer(initialState, {
  [setUser]: (state, action) => action.payload,
});

export default userReducer;
