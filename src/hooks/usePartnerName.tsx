import { useAppSelector } from '../app/store';
import { partnerNameSelector } from '../pages/AddPartner/partnerSlice';

export const usePartnerName = () => {
  return useAppSelector(partnerNameSelector);
};
