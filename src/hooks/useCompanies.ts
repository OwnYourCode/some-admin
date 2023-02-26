import { useAppSelector } from '../app/store';
import { companiesSelector } from '../pages/AddPartner/partnerSlice';

export const useCompanies = () => {
  return useAppSelector(companiesSelector);
};
