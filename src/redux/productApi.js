import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
    //  To send a token to all requests, place the token here.
    /*  prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        `Bearer  ${localStorage.getItem('yourTokenIsHere')} `
      );
      return headers;
    }, */
  }),
  endpoints: (build) => ({
    // query is an alternative of "GET" method
    // A query that is used to get the list of products.
    getProduct: build.query({
      query: () => `product`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Products', id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    /* A mutation that is used to add a product. */
    addProduct: build.mutation({
      query: (body) => ({
        url: 'product',
        //you can use PUT or DELETE method instead of POST
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    /* A mutation that is used to edit a product. */
    editProduct: build.mutation({
      query: ({ main, id }) => ({
        url: `product/${id}`,
        method: 'PUT',
        body: { name: main, id: id },
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    /* A mutation that is used to delete a product. */
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  }),
});

export const {
  useAddProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
  useGetProductQuery,
} = productApi;
