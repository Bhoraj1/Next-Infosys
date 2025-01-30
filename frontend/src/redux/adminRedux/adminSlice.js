import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminDetails: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    login: (state, action) => {
      state.adminDetails = action.payload; // for Save admin details
    },
    logout: (state) => {
      state.adminDetails = null;
    },
  },
});

export const { login, logout } = adminSlice.actions;

export default adminSlice.reducer;
