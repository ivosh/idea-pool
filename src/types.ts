export const url = 'https://small-project-api.herokuapp.com';

export interface AccessToken {
  exp: number;
  id: string;
  email: string;
  name: string;
}

export interface AuthTokens {
  accessToken: string; // decoded produces AccessToken
  expires: number; // access token expiration
  refreshToken: string;
}
