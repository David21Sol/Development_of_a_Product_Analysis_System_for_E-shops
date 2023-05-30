import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryTitle: "All",
  currentPage: 1,
  sortType: {
    name: "all",
    sortProperty: "",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryTitle(state, action) {
      state.categoryTitle = action.payload;
    },

    setSortType(state, action) {
      state.sortType = action.payload;
    },

    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryTitle, setSortType, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
