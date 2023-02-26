import { Route, Switch, Redirect } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import { LoginCallback } from '../pages/LoginCallback/LoginCallback';
import { ROUTE } from '../shared/route';

export default function UnAuthenticatedApp() {
  return (
    <>
      <Switch>
        <Route exact path={ROUTE.CALLBACK} component={LoginCallback} />
        <Route path={ROUTE.SIGN_IN} component={Login} />
        <Redirect from="*" to={ROUTE.SIGN_IN} />
      </Switch>
    </>
  );
}
