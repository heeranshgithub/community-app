import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const currBaseSimURL = 'http://10.0.2.2:8080/api/v1/';
const currBase_HP_BH_IP_URl = 'http://172.16.16.123:8080/api/v1/';
const currBase_HP_Home_IP_URl = 'http://192.168.1.105:8080/api/v1/';

const baseApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: currBaseSimURL,
    // baseUrl: currBase_HP_IP_URl,
    // baseUrl: currBase_HP_Home_IP_URl,
    baseUrl: currBase_HP_BH_IP_URl,
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
  tagTypes: ['Tree'],
});

export default baseApiSlice;
