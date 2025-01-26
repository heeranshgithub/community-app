import { createSlice } from '@reduxjs/toolkit';
import { secureStorage } from '../../utils';

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
      const { token, name, number, gender, id } = action.payload;
      state.token = token; // Immer taking care of immutability under the hood
      state.id = id;
      state.name = name;
      state.number = number;
      state.gender = gender;

      secureStorage.saveUserToken(token);
      secureStorage.saveUserId(id);
    },

    clearUser: (state) => {
      state.token = null;
      state.name = '';
      state.number = '';
      state.gender = '';
      state.id = '';

      secureStorage.clearUserData();
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const getUserToken = (state) => state?.user?.token;
export const getUserId = (state) => state?.user?.id;

export default userSlice.reducer;
