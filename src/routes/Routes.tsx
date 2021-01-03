import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthRoute from '../components/AuthRoute';
import Login from './Login';
import Logout from './Logout';
import Main from './Main';
import Signup from './Signup';

export default function Routes(): JSX.Element {
  return (
    <Switch>
      <AuthRoute exact path="/" component={Main} />
      <AuthRoute path="/main" component={Main} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  );
}
