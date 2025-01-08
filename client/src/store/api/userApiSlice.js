import baseApiSlice from './baseApiSlice';

export const userApiSlice = baseApiSlice.injectEndpoints({
  injectEndpoints: true,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/user/register',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = userApiSlice;
