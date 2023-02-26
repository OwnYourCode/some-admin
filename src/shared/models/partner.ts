import { Category } from './category';

export interface Partner {
  id: number;
  name: string;
  website?: string;
  logo?: string;
  isNdaSigned: boolean;
  isTechnicalQuestionnaireSigned: boolean;
  isCommercialQuestionnaireSigned: boolean;
  isPciComplianceAcquired: boolean;
  isDataProtectionAgreementReceived: boolean;
  isXmlAgreementReceived: boolean;
  isPublished: boolean;
  categories: Category[];
}
