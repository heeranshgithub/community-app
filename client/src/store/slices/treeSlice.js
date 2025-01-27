import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  treeId: '',
  treeStack: [], 
};

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    setTreeId: (state, action) => {
      state.treeId = action.payload; // Immer taking care of immutability under the hood
      // action.payload is the treeId here (only one value getting passed)
    },
  },
});

export const { setTreeId } = treeSlice.actions;
export const getCurrentTreeId = (state) => state?.tree?.treeId;

export default treeSlice.reducer;
