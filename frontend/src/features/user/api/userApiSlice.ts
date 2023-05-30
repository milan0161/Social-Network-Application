import { apiSlice } from '../../../app/api/apiSlice';
import { InitalUserState, UserInformations } from '../../auth/types';
import { Image } from '../../post/types';
import { Followers, Following, UnfollowedUsers, Search } from '../types';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFollowers: builder.query<Followers, string>({
      query: (id: string) => ({
        url: `/user/api/v1/get-followers/${id}`,
        method: 'GET',
        headers: { Authorization: true },
      }),
      providesTags: ['Followers'],
    }),
    getFollowing: builder.query<Following, string>({
      query: (id: string) => ({
        url: `/user/api/v1/get-following/${id}`,
        method: 'GET',
        headers: { Authorization: true },
      }),
      providesTags: ['Following'],
    }),
    getSingleUser: builder.query<{ user: InitalUserState }, string>({
      query: (id: string) => ({
        url: `/user/api/v1/single-user/${id}`,
        method: 'GET',
        headers: { Authorization: true },
      }),
    }),
    getAllUnfollowed: builder.query<UnfollowedUsers, void>({
      query: () => ({
        url: '/user/api/v1/get-all',
      }),
      providesTags: ['UnFollowedUsers'],
    }),
    getUserPhotos: builder.query<{ allImages: Image[] }, string>({
      query: (id: string) => ({
        url: `/images/api/v1/get-user-photos/${id}`,
      }),
      providesTags: ['Images'],
    }),
    setProfilePicture: builder.mutation({
      query: (id: string) => ({
        url: `/user/api/v1/set-profile-picture/${id}`,
        method: 'POST',
      }),
    }),
    searchUsers: builder.query<Search, string>({
      query: (search: string) => ({
        url: `/user/api/v1/get-all-users?search=${search}`,
        // data: search,
      }),
    }),
    getUserInfo: builder.query<{ userInfo: UserInformations }, string>({
      query: (id: string) => ({
        url: `/user/api/v1/get-user-info/${id}`,
      }),
    }),
    addUserInfo: builder.mutation<void, UserInformations>({
      query: (data) => ({
        url: 'http://localhost:7000/user/api/v1/update-informations',
        method: 'PATCH',
        data: data,
      }),
    }),
  }),
});

export const {
  useGetFollowersQuery,
  useGetSingleUserQuery,
  useGetAllUnfollowedQuery,
  useGetFollowingQuery,
  useGetUserPhotosQuery,
  useSetProfilePictureMutation,
  useSearchUsersQuery,
  useAddUserInfoMutation,
  useGetUserInfoQuery,
} = usersApiSlice;
