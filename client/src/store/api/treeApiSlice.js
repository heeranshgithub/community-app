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
    updateTree: builder.mutation({
      query: ({ treeId, data }) => ({
        url: `/tree/${treeId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { treeId }) => [
        { type: 'Tree', treeId },
      ], // Invalidate the specific tag
    }),
  }),
});

export const { useGetTreeQuery, useUpdateTreeMutation } = treeApiSlice;
