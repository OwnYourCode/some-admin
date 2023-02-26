import { object, string } from 'yup';
import { ErrorText } from '../../shared/enums/errorText';

export const validationSchema = object().shape({
  partnerName: string().required(ErrorText.PARTNER_NAME_REQUIRED),
  website: string().url(ErrorText.CORRECT_WEBSITE_URL),
  logo: string().url(ErrorText.CORRECT_LOGO_URL),
  // category: string(),
  // company: string(),
  // mainSalutation: string().required(ErrorText.SALUTATION_REQUIRED),
  // mainFirstName: string().required(ErrorText.FIRST_NAME_REQUIRED),
  // mainLastName: string().required(ErrorText.LAST_NAME_REQUIRED),
  // mainJobTitle: string().required(ErrorText.JOB_TITLE_REQUIRED),
  // mainEmail: string().required(ErrorText.EMAIL_REQUIRED).email(ErrorText.CORRECT_EMAIL),
  // commercialSalutation: string().required(ErrorText.SALUTATION_REQUIRED),
  // commercialFirstName: string().required(ErrorText.FIRST_NAME_REQUIRED),
  // commercialLastName: string().required(ErrorText.LAST_NAME_REQUIRED),
  // commercialJobTitle: string().required(ErrorText.JOB_TITLE_REQUIRED),
  // commercialEmail: string().required(ErrorText.EMAIL_REQUIRED).email(ErrorText.CORRECT_EMAIL),
  // technicalSalutation: string().required(ErrorText.SALUTATION_REQUIRED),
  // technicalFirstName: string().required(ErrorText.FIRST_NAME_REQUIRED),
  // technicalLastName: string().required(ErrorText.LAST_NAME_REQUIRED),
  // technicalJobTitle: string().required(ErrorText.JOB_TITLE_REQUIRED),
  // technicalEmail: string().required(ErrorText.EMAIL_REQUIRED).email(ErrorText.CORRECT_EMAIL),
});
