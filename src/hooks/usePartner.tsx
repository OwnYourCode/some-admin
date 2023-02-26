import { useAppSelector } from '../app/store';
import { partnerInfoSelector } from '../pages/AddPartner/partnerSlice';

export const usePartner = () => {
  return useAppSelector(partnerInfoSelector);
};
