import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../api/axios/axios';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Followers', 'Following', 'UnFollowedUsers', 'Posts', 'Images', 'Messages'],
  endpoints: (builder) => ({}),
});
