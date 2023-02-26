import { useAppSelector } from '../app/store';
import { userInfoSelector } from '../pages/Login/userSlice';

export const useUserInfo = () => {
  return useAppSelector(userInfoSelector);
};
