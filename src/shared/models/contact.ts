import { ContactType } from '../enums/contactType';

export interface Contact {
  salutation: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone?: string;
  type?: ContactType;
}

export const CONTACT_MAPPER = {
  [ContactType.Main]: 'Main contact',
  [ContactType.Technical]: 'Technical contact',
  [ContactType.Commercial]: 'Commercial contact',
};
