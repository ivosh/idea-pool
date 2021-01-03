import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../context/auth-provider';

export default function Logout(): JSX.Element {
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const logOut = async (): Promise<void> => {
      await logout();
    };
    logOut();
  }, [logout]);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <></>;
}
