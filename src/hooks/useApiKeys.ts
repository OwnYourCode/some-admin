import { useAppSelector } from '../app/store';
import { apiKeysSelector } from '../pages/AddPartner/partnerSlice';

export const useApiKeys = () => {
  return useAppSelector(apiKeysSelector);
};
