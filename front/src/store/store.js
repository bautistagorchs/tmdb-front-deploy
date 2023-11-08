import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import searchReducer from "./search";
import singleReducer from "./singleMovie";

const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    single: singleReducer,
  },
});

export default store;
