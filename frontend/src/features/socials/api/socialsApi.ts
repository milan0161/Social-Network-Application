import { apiSlice } from '../../../app/api/apiSlice';

export const socialApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation<{ message: string }, string>({
      query: (id: string) => ({
        url: `socials/api/v1/follow-user/${id}`,
        method: 'POST',
        body: id,
      }),
      invalidatesTags: ['Followers', 'UnFollowedUsers', 'Following'],
    }),
    unFollowUser: builder.mutation<{ message: string }, string>({
      query: (id: string) => ({
        url: `socials/api/v1/unfollow-user/${id}`,
        method: 'POST',
        body: id,
      }),
      invalidatesTags: ['UnFollowedUsers', 'Following', 'Followers'],
    }),
  }),
});

export const { useFollowUserMutation, useUnFollowUserMutation } = socialApiSlice;
