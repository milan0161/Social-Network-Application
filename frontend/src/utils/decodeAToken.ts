import jwtDecode from 'jwt-decode';
import { InitalUserState } from '../features/auth/types';
import { getAToken } from './getTokens';

type User = {
  firstname: string;
  lastname: string;
  id: string;
  email: string;
};

const decodeAToken = (): User | null => {
  const token = getAToken();
  if (!token) {
    return null;
  }
  const decodedToken: User = jwtDecode(token);
  return decodedToken;
};

export default decodeAToken;
