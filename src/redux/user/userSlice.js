import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  user: {},
  users: [],
};

// Create a slice for user-related state management
const userSlice = createSlice({
  name: "user",
  initialState,

  // State Update reducers Functions
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    resetUser: (state) => {
      state.user = {};
    },
  },
});

// Export the reducer and actions from the slice
const { reducer: userReducer, actions } = userSlice;

//destructure actions for easy access
export const { setUser, setUsers, resetUser } = actions;
export default userReducer;
