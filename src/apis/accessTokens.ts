import axios from 'axios';

import { TryGetValidToken, url } from '../types';
import { Tokens } from './users';

export interface RefreshTokenProps {
  refresh_token: string;
}

export const refreshToken = async (token: RefreshTokenProps): Promise<string> => {
  const response = await axios.post<string>(`${url}/access-tokens/refresh`, token);
  return response.data;
};

export interface UserLoginProps {
  email: string;
  password: string;
}

export const userLogin = async (credentials: UserLoginProps): Promise<Tokens> => {
  const response = await axios.post<Tokens>(`${url}/access-tokens`, credentials);
  return response.data;
};

export interface UserLogoutProps {
  refresh_token: string;
}

export const userLogout = async (
  props: UserLogoutProps,
  tryGetValidToken: TryGetValidToken
): Promise<void> => {
  const tokens = await tryGetValidToken();

  await axios.delete<Tokens>(`${url}/access-tokens`, {
    headers: {
      'X-Access-Token': tokens?.accessToken,
    },
    data: { ...props },
  });
};
