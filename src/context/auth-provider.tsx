import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

import { refreshToken, userLogin, UserLoginProps, userLogout } from '../apis/accessTokens';
import { Tokens } from '../apis/users';
import { AccessToken, AuthTokens, TryGetValidToken } from '../types';

interface IAuthContextShape {
  accessToken: AccessToken | null;
  isAuthenticated: boolean;
  login: (credentials: UserLoginProps) => Promise<void>;
  logout: () => Promise<void>;
  tryGetValidToken: TryGetValidToken;
}

export const AuthContext = createContext<IAuthContextShape>({} as IAuthContextShape);

export const useAuth = (): IAuthContextShape => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps): JSX.Element | null => {
  const [accessToken, setAccessToken] = useState<AccessToken | null>(null);
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const decodeAccessToken = (token: string): AccessToken => jwt.decode(token) as AccessToken;

  useEffect(() => {
    const tokens = getTokensFromLocalStorage();
    if (tokens) {
      setAuthTokens(tokens);
      setAccessToken(decodeAccessToken(tokens.accessToken));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: UserLoginProps): Promise<void> => {
    const tokens = await userLogin(credentials);
    setTokensInLocalStorage(tokens);
  };

  const logout = async (): Promise<void> => {
    if (authTokens) {
      await userLogout({ refresh_token: authTokens.refreshToken }, tryGetValidToken);
    }
    removeTokensFromLocalStorage();
  };

  const isValid = (tokens: AuthTokens): boolean => {
    return new Date(tokens.expires * 1e3) > new Date();
  };

  const tryGetValidToken = async (): Promise<AuthTokens | null> => {
    const tokens = getTokensFromLocalStorage();

    // No tokens in storage
    if (tokens === null) {
      return null;
    }

    // Valid token in storage
    if (isValid(tokens)) {
      return tokens;
    }

    // Invalid token in storage
    try {
      const newAccessToken = await refreshToken({
        refresh_token: tokens.refreshToken,
      });
      setTokensInLocalStorage({
        jwt: newAccessToken,
        refresh_token: tokens.refreshToken,
      });

      return getTokensFromLocalStorage();
    } catch {
      logout();
    }

    removeTokensFromLocalStorage();
    return null;
  };

  const setTokensInLocalStorage = (data: Tokens): void => {
    const decoded = decodeAccessToken(data.jwt);

    const tokens: AuthTokens = {
      accessToken: data.jwt,
      expires: decoded.exp,
      refreshToken: data.refresh_token,
    };

    localStorage.setItem('authTokens', JSON.stringify(tokens));
    setAccessToken(decoded);
    setAuthTokens(tokens);
  };

  const getTokensFromLocalStorage = (): AuthTokens | null => {
    const tokens = localStorage.getItem('authTokens');
    if (tokens === null) {
      return null;
    }

    const parsedTokens = JSON.parse(tokens);
    return {
      accessToken: parsedTokens.accessToken,
      expires: parsedTokens.expires,
      refreshToken: parsedTokens.refreshToken,
    };
  };

  const removeTokensFromLocalStorage = (): void => {
    localStorage.removeItem('authTokens');
    setAuthTokens(null);
  };

  const isAuthenticated = !!(authTokens && authTokens.accessToken);

  const provider = (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated,
        login,
        logout,
        tryGetValidToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );

  return isLoading ? null : provider;
};
