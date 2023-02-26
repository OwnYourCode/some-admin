import { setAuthenticatedUser } from '../pages/Login/userSlice';
import { useAppDispatch } from '../app/store';
import { useEffect } from 'react';
import { authService } from '../services/authService';
import { createAuthenticatedUser } from '../helpers/createAuthenticatedUser';
import { useUserInfo } from './useUserInfo';

type UseAuthenticated = () => boolean | undefined;

export const useAuthenticated: UseAuthenticated = () => {
  const userInfo = useUserInfo();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userInfo?.isAuthenticated) {
      return;
    }

    const checkIsUserAuthenticated = async () => {
      try {
        const authenticatedUserData = await authService.getUser();
        if (authenticatedUserData?.profile) {
          const authenticatedUser = createAuthenticatedUser(authenticatedUserData.profile);
          dispatch(setAuthenticatedUser(authenticatedUser));
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkIsUserAuthenticated();
  }, [dispatch, userInfo]);

  return userInfo?.isAuthenticated;
};
