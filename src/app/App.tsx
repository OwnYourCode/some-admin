import { BrowserRouter as Router } from 'react-router-dom';
import { lazy } from 'react';
// import { useAuthenticated } from '../hooks/useAuthenticated';
// import { useRoles } from '../hooks/useRoles';
// import { Role } from '../shared/enums/role';

const AuthenticatedApp = lazy(() => import('./AuthenticatedApp'));
// const UnAuthenticatedApp = lazy(() => import('./UnAuthenticatedApp'));

function App() {
  // const isAuthenticated = useAuthenticated();
  // const roles = useRoles();

  return (
    <Router>
      <AuthenticatedApp />
    </Router>
  );
}

export default App;
