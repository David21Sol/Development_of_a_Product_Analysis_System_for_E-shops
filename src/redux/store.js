import { configureStore } from "@reduxjs/toolkit";

import filter from "./slices/filterSlice";

//store- redux store

export const store = configureStore({
  reducer: {
    filter,
  },
});
