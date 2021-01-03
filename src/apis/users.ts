import axios from 'axios';
import { url } from '../types';

export interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}
export interface Tokens {
  jwt: string; // decoded produces AccessToken
  refresh_token: string;
}

export const createUser = async (user: CreateUserProps): Promise<Tokens> => {
  const response = await axios.post<Tokens>(`${url}/users`, user);
  return response.data;
};
