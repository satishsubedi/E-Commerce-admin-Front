import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  user: {},
  users: [],
  isLoading: false,
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
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Export the reducer and actions from the slice
const { reducer: userReducer, actions } = userSlice;

//destructure actions for easy access
export const { setUser, setUsers, resetUser, setIsLoading } = actions;
export default userReducer;
