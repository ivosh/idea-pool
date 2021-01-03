import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignUp from './SignUp';

export default function Routes(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/" component={SignUp} />
      {
        // <AuthRoute path="/catalogue" component={CatalogueRouter} />
        // <Route exact path="/login" component={Login} />
      }

      <Route exact path="/signup" component={SignUp} />
    </Switch>
  );
}
