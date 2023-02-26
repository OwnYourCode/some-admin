import { Contact } from './contact';

export interface AddPartner {
  name: string;
  website?: string | null;
  logo?: string;
  categoriesIds?: number[];
  contacts?: Contact[];
  category?: number;
  companyId?: number;
}
