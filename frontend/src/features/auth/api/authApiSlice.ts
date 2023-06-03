import { apiSlice } from '../../../app/api/apiSlice';
import { RequestLogin, RequestRegister, ResponseLogin, ResponseRegister } from '../types';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponseLogin, RequestLogin>({
      query: (data) => ({
        url: 'auth/api/v1/login',
        method: 'POST',
        headers: { Authorization: false },
        data: data,
      }),
    }),
    register: builder.mutation<ResponseRegister, RequestRegister>({
      query: (data) => ({
        url: 'auth/api/v1/register',
        method: 'POST',
        headers: { Authorization: false },
        data: data,
      }),
    }),
    changePassword: builder.mutation<void, { oldPassword: string; newPassword: string }>({
      query: ({ newPassword, oldPassword }) => ({
        url: 'auth/api/v1/change-password',
        method: 'PATCH',
        headers: { Authorization: true },
        data: { oldPassword, newPassword },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useChangePasswordMutation } = authApiSlice;
