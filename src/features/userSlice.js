import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },    
    // state is the actual state of the userSlice
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
// selectUser -> will allow us to pull the users iformation also called "Selectors"
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
