import { configureStore } from '@reduxjs/toolkit';
import baseApiSlice from './api/baseApiSlice';
import userReducer from './slices/userSlice';
import treeReducer from './slices/treeSlice';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

const store = configureStore({
  reducer: {
    user: userReducer,
    tree: treeReducer,
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApiSlice.middleware),
  devTools: false,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(devToolsEnhancer()),
});

export default store;
