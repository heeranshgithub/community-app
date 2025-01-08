import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const currBaseSimURL = 'http://10.0.2.2:5000/api/v1/';
// const currBaseIPURl = ' http://192.168.1.103:5000/api/v1/';

const baseApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: currBaseSimURL,
    prepareHeaders: async (headers, { getState }) => {
      headers.set('Content-Type', 'application/json');
      const token = getState()?.user?.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default baseApiSlice;
