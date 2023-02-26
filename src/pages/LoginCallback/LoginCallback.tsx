import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { authService } from '../../services/authService';
import { ROUTE } from '../../shared/route';
import { setAuthenticatedUser } from '../Login/userSlice';
import { useAppDispatch } from '../../app/store';
import { createAuthenticatedUser } from '../../helpers/createAuthenticatedUser';
import querystring from 'query-string';

export const LoginCallback = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  const { search } = useLocation();

  useEffect(() => {
    const code = querystring.parseUrl(search)?.query?.code;
    if (!code) {
      return;
    }

    const callSigninCb = async () => {
      try {
        const authenticatedUserData = await authService.signinRedirectCallback();

        if (authenticatedUserData?.profile) {
          const authenticatedUser = createAuthenticatedUser(authenticatedUserData.profile);
          dispatch(setAuthenticatedUser(authenticatedUser));

          push(ROUTE.OVERVIEW);
        }
      } catch (error) {
        // TODO: maybe delete it later ???
        console.error(error);
      }
    };

    callSigninCb();
  }, [dispatch, push, search]);

  return null;
};
