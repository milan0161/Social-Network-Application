import { axiosInstance } from '../api/axios/axios';
import { getRToken } from './getTokens';

const rToken = getRToken();
type Tokens = {
  aToken: string;
  rToken: string;
};

export const refreshTokens = async () => {
  try {
    const response = await axiosInstance.post('/refresh', { rToken: rToken });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    } else {
      return Promise.resolve(response.data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
