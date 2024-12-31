import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const currBaseURL = 'http://localhost:5001/api/v1/'

const baseApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: currBaseURL,
    prepareHeaders: async (headers, { getState }) => {
      headers.set('Content-Type', 'application/json')
      const token = getState()?.user?.accessToken

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: () => {},
})

export default baseApiSlice
