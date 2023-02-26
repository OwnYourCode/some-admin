import { FieldNamesMarkedBoolean } from 'react-hook-form/dist/types/form';
import { FieldValues } from 'react-hook-form';
import { allRequiredFields } from '../pages/AddPartner/requiredFields';

export const hasNotAnyEnteredRequiredContactsFields = (
  dirtyFields: FieldNamesMarkedBoolean<FieldValues>,
  requiredFields = allRequiredFields,
) => {
  if (dirtyFields) {
    for (const [key, value] of Object.entries(dirtyFields)) {
      if (Object.keys(requiredFields).includes(key) && value) {
        return false;
      }
    }

    return true;
  }
};
