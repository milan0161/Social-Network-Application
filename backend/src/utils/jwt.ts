import * as jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
require('dotenv').config();
export const p = path.join(__dirname, '..', '..');

type Payload = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
};

const PRIV_KEY = fs.readFileSync(p + '/priv_key.pem', 'utf8');

const signAtoken = (user: Payload) => {
  const aToken = jwt.sign(user, PRIV_KEY, { algorithm: 'RS256', expiresIn: '1h' });
  return aToken;
};
const signRToken = (id: string) => {
  const rToken = jwt.sign({ id: id }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '1d' });
  return rToken;
};

export { signAtoken, signRToken };
