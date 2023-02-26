import { useAppSelector } from '../app/store';
import { categoriesListSelectors } from '../pages/AddPartner/categoriesSlice';

export const useCategories = () => {
  return useAppSelector(categoriesListSelectors);
};
