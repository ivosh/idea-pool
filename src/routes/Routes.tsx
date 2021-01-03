import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';

export default function Routes(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/" component={Signup} />
      {
        // <AuthRoute path="/catalogue" component={CatalogueRouter} />
      }

      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  );
}
