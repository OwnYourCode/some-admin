import { Category } from '../../shared/models/category';
import { ContactType } from '../../shared/enums/contactType';
import { Contact } from '../../shared/models/contact';

export const generalInfo = {
  partnerName: '',
  website: '',
  logo: '',
  category: undefined,
  company: undefined,
};

export const mainContact = {
  mainSalutation: '',
  mainFirstName: '',
  mainLastName: '',
  mainJobTitle: '',
  mainEmail: '',
  mainTelephone: '',
  type: ContactType.Main,
};

export const commercialContact = {
  commercialSalutation: '',
  commercialFirstName: '',
  commercialLastName: '',
  commercialJobTitle: '',
  commercialEmail: '',
  commercialTelephone: '',
  type: ContactType.Commercial,
};

export const technicalContact = {
  technicalSalutation: '',
  technicalFirstName: '',
  technicalLastName: '',
  technicalJobTitle: '',
  technicalEmail: '',
  technicalTelephone: '',
  type: ContactType.Technical,
};

export const allContacts = {
  ...mainContact,
  ...commercialContact,
  ...technicalContact,
};

export const defaultValues = {
  ...generalInfo,
  ...allContacts,
};

export interface AddPartnerState {
  partnerName: string;
  website?: string;
  logo?: string;
  contacts?: Contact[];
  company?: number;
  category?: number;
  categories?: Category[] | null;
}
