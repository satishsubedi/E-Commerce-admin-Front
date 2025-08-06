import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  user: {},
  users: [],
  isLoading: false,
  accessJWT: sessionStorage.getItem("accessJWT") || null,
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

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAccessJWT: (state, action) => {
      state.accessJWT = action.payload;
      // Also update sessionStorage when Redux state changes
      if (action.payload) {
        sessionStorage.setItem("accessJWT", action.payload);
      } else {
        sessionStorage.removeItem("accessJWT");
      }
    },
    resetUser: (state) => {
      state.user = {};
      state.accessJWT = null;
      // Clear sessionStorage when resetting user
      sessionStorage.removeItem("accessJWT");
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Export the reducer and actions from the slice
const { reducer: userReducer, actions } = userSlice;

//destructure actions for easy access
export const { setUser, setUsers, resetUser, setIsLoading, setAccessJWT } =
  actions;
export default userReducer;
