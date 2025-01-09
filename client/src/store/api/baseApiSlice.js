import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Platform } from 'react-native'

const currBaseSimURL =
  Platform.OS === 'ios'
    ? 'http://localhost:5001/api/v1/' // iOS simulator uses localhost
    : 'http://10.0.2.2:5001/api/v1/' // Android emulator uses 10.0.2.2

// const currBaseIPURl = ' http://192.168.1.103:5001/api/v1/';

const baseApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: currBaseSimURL,
    prepareHeaders: async (headers, { getState }) => {
      headers.set('Content-Type', 'application/json')
      const token = getState()?.user?.token

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
})

export default baseApiSlice
