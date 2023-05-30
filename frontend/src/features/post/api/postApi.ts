import { apiSlice } from '../../../app/api/apiSlice';
import { Posts } from '../types';

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserPosts: builder.query<Posts, string>({
      query: (id: string) => ({
        url: `/post/api/v1/get-post/${id}`,
        method: 'GET',
      }),
      providesTags: ['Posts'],
    }),
    createPost: builder.mutation({
      query: ({ images, content }) => ({
        url: `/post/api/v1/create-post`,
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: { images, content },
      }),
      invalidatesTags: ['Posts', 'Images'],
    }),
    getNewFeeds: builder.query<Posts, void>({
      query: () => ({
        url: '/post/api/v1/get-new-feeds',
      }),
      providesTags: ['Posts'],
    }),
    createComment: builder.mutation<void, { id: string; content: string }>({
      query: ({ id, content }) => ({
        url: `/comment/api/v1/create-comment/${id}`,
        method: 'POST',
        data: { content },
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const { useGetUserPostsQuery, useCreatePostMutation, useGetNewFeedsQuery, useCreateCommentMutation } =
  postApiSlice;
