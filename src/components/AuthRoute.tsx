import React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';

import { useAuth } from '../context/auth-provider';

export interface AuthRouteProps {
  component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
}

const AuthRoute = ({ component: Component, ...rest }: AuthRouteProps): JSX.Element => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={(props): JSX.Element =>
        isAuthenticated ? (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />
        )
      }
    />
  );
};

export default AuthRoute;
