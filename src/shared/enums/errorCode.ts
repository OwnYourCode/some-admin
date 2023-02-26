export enum ErrorCode {
  // Security error group 100-199
  GeneralSecurityError = 100,
  AccessDenied = 101,
  NotAuthorized = 102,

  // Validation error group 200-299
  GeneralValidationError = 200,
  DuplicateKey = 201,
  DataAccess = 202,
  DuplicateCategoryName = 203,
  CategoryNotFound = 204,
  PartnerNotFound = 205,
  ContactNotFound = 206,
  OnlyMainContactTypeChange = 207,
  OneOrMoreCategoryDoNotExist = 208,

  // Operation error group 300-399
  GeneralOperationError = 300,
  NotFound = 301,

  // Database Errors
  UnknownDatabaseError = 600,
  DuplicateIndex = 601,
}
