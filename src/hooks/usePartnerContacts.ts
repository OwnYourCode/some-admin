import { useAppSelector } from '../app/store';
import { partnerContactsSelector } from '../pages/AddPartner/partnerSlice';

export const usePartnerContacts = () => {
  return useAppSelector(partnerContactsSelector);
};
