import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  name: '',
  number: '',
  gender: '',
  id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token; // Immer taking care of immutability under the hood
      state.name = action.payload.name;
      state.number = action.payload.number;
      state.gender = action.payload.gender;
      state.id = action.payload.id;
    },

    clearUser: (state) => {
      state.token = null;
      state.name = '';
      state.number = '';
      state.gender = '';
      state.id = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const getUserToken = (state) => state?.user?.token;

export default userSlice.reducer;
