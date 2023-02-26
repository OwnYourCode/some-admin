export const generalInfoRequiredFields = {
  partnerName: '',
};

export type MainContactRequiredFields = keyof typeof mainContactRequiredFields;

export const mainContactRequiredFields = {
  mainSalutation: '',
  mainFirstName: '',
  mainLastName: '',
  mainJobTitle: '',
  mainEmail: '',
};

export type CommercialContactRequiredFields = keyof typeof commercialContactRequiredFields;

export const commercialContactRequiredFields = {
  commercialSalutation: '',
  commercialFirstName: '',
  commercialLastName: '',
  commercialJobTitle: '',
  commercialEmail: '',
};

export type TechnicalContactRequiredFields = keyof typeof technicalContactRequiredFields;

export const technicalContactRequiredFields = {
  technicalSalutation: '',
  technicalFirstName: '',
  technicalLastName: '',
  technicalJobTitle: '',
  technicalEmail: '',
};

export type AllRequiredFields = keyof typeof allRequiredFields;

export const allRequiredFields = {
  ...mainContactRequiredFields,
  ...commercialContactRequiredFields,
  ...technicalContactRequiredFields,
};
