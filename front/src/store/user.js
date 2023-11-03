import { createAction, createReducer } from "@reduxjs/toolkit";
//import { message } from "antd";

export const setUser = createAction("SET_USER");
const initialState = {
  id: undefined,
  email: undefined,
  name: undefined,
  last_name: undefined,
  // password: undefined,
};

const userReducer = createReducer(initialState, {
  [setUser]: (state, action) => action.payload,
});

export default userReducer;
