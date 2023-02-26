import { Layout } from '../components/Layout/Layout';
import { PartnerOverview } from '../pages/PartnerOverview/PartnerOverview';
import { PartnerDashboard } from '../pages/PartnerDashboard/PartnerDashboard';
import { Redirect, Route, Switch } from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage';
import { Interceptor } from '../components/Interceptor';
import { LoginCallback } from '../pages/LoginCallback/LoginCallback';
import { ROUTE } from '../shared/route';

export default function AuthenticatedApp() {
  return (
    <>
      <Interceptor />
      <Switch>
        {/*
        TODO: It's added like bypass, because Identity server seems like
        does not support correct silent token refreshment
        */}
        <Route path={ROUTE.CALLBACK} component={LoginCallback} />
        <Layout exact path={ROUTE.OVERVIEW}>
          <PartnerOverview />
        </Layout>
        <Layout exact path="/overview/:partnerId">
          <PartnerDashboard />
        </Layout>
        {/* redirect from /, /signin, /login to /overview just for user convenience */}
        <Redirect exact from="/(|login|signin)" to={ROUTE.OVERVIEW} />
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
}
