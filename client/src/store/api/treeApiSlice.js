import baseApiSlice from './baseApiSlice';

export const treeApiSlice = baseApiSlice.injectEndpoints({
  injectEndpoints: true,
  endpoints: (builder) => ({
    getTree: builder.query({
      query: (treeId) => ({
        url: `/tree/${treeId}`,
        method: 'GET',
      }),
      providesTags: (result, error, treeId) => [{ type: 'Tree', treeId }], // Associate the tag with the query
    }),
    postTree: builder.mutation({
      query: ({ creatorTreeId, treeData }) => ({
        url: `/tree`,
        method: 'POST',
        body: treeData,
      }),
      invalidatesTags: (result, error, { creatorTreeId }) => [
        { type: 'Tree', creatorTreeId },
      ], // Invalidate the specific tag
    }),
  }),
});

export const { useGetTreeQuery, usePostTreeMutation } = treeApiSlice;
