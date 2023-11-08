import { createAction, createReducer } from "@reduxjs/toolkit";
//import { message } from "antd";

export const setSingle = createAction("SET_SINGLE");
const initialState = {
  singleMovie: {},
  singleTvShow: {},
};

const singleReducer = createReducer(initialState, {
  [setSingle]: (state, action) => action.payload,
});

export default singleReducer;
