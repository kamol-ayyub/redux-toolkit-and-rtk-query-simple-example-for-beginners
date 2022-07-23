import { createSlice } from '@reduxjs/toolkit';

import { UsersData } from '../data/data';

export const exampleSlice = createSlice({
  name: 'exampleReducer',
  initialState: {
    value: UsersData,
  },
  reducers: {
    /* Adding a new user to the state.value array. */
    addUser: (state, action) => {
      state.value.push(action.payload);
    },

    /* Filtering the state.value array and returning a new array with the user that has the id that is
   passed in the action.payload.id. */
    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    },

    /* Updating the username of the user with the id that is passed in the action.payload.id. */
    updateUsername: (state, action) => {
      state.value.map((user) => {
        if (user.id === action.payload.id) {
          user.username = action.payload.username;
        }
      });
    },
  },
});

export const { addUser, deleteUser, updateUsername } = exampleSlice.actions;
export default exampleSlice.reducer;
