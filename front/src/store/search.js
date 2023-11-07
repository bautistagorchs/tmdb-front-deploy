import { createAction, createReducer } from "@reduxjs/toolkit";
//import { message } from "antd";

export const setSearch = createAction("SET_SEARCH");
const initialState = {
  movieResult: null,
  tvResult: null,
};

const searchReducer = createReducer(initialState, {
  [setSearch]: (state, action) => action.payload,
});

export default searchReducer;
