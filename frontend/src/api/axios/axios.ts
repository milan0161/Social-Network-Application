import axios, { InternalAxiosRequestConfig, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { getAToken } from '../../utils/getTokens';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { refreshTokens } from '../../utils/refreshTokens';
import { saveTokens } from '../../utils/saveTokens';

export const { REACT_APP_BASE_URL } = process.env;

export const axiosInstance = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig<any> => {
    if (config.headers.Authorization !== false) {
      const aToken = getAToken();
      if (aToken) {
        config.headers.Authorization = `Bearer ${aToken}`;
      }
      return config;
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (config: AxiosResponse): AxiosResponse<any> => {
    if (config.status === 200) {
      return config;
    }
    return config;
  },
  async (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 403) {
      const tokens = await refreshTokens();
      saveTokens(tokens.aToken, tokens.rToken);
      return axiosInstance.request(error.request);
    }
    return Promise.reject(error.response?.data);
  },
);

// axiosInstance.post('asdasd', { trt: '' }, { headers });

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosRequestConfig<any>, unknown, AxiosError> =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {
        error,
      };
    }
  };

// export const axiosBaseQuery =
//   (): BaseQueryFn<
//     {
//       url: string;
//       method: AxiosRequestConfig['method'];
//       data?: AxiosRequestConfig['data'];
//       params?: AxiosRequestConfig['params'];
//     },
//     unknown,
//     unknown
//   > =>
//   async ({ url, method, data, params }) => {
//     try {
//       const result = await axiosInstance({
//         url,
//         method,
//         data,
//         params,
//       });
//       return { data: result.data };
//     } catch (axiosError) {
//       const error = axiosError as AxiosError;
//       return {
//         error,
//       };
//     }
//   };

// export const axiosBaseQuery =
//   (
//     { baseUrl }: { baseUrl: string } = { baseUrl: '' },
//   ): BaseQueryFn<
//     {
//       url: string;
//       method: AxiosRequestConfig['method'];
//       data?: AxiosRequestConfig['data'];
//       params?: AxiosRequestConfig['params'];
//     },
//     unknown,
//     unknown
//   > =>
//   async ({ url, method, data, params }) => {
//     try {
//       const result = await axiosInstance({ url: baseUrl + url, method, data, params });
//       return { data: result.data };
//     } catch (axiosError) {
//       let err = axiosError as AxiosError;
//       return {
//         error: {
//           status: err.response?.status,
//           data: err.response?.data || err.message,
//         },
//       };
//     }
//   };
