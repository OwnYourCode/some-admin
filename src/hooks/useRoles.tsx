import { useAppSelector } from '../app/store';
import { userRolesSelector } from '../pages/Login/userSlice';

export const useRoles = () => {
  return useAppSelector(userRolesSelector);
};
