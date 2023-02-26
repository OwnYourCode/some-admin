import { useAppSelector } from '../app/store';
import { userPartnerIdsSelector } from '../pages/Login/userSlice';

export const usePartnerIds = () => {
  return useAppSelector(userPartnerIdsSelector);
};
