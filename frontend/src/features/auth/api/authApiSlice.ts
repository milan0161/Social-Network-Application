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
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
