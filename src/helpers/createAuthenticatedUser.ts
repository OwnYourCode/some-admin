/**
 * method to create authenticated user from data returned
 * by oidc-client library
 * including scopes
 * @param profile
 */

export const createAuthenticatedUser = (profile: any) => {
  const { name, roles, permissions, bpPropertyids, companyids } = profile;

  return {
    name,
    roles: roles?.split(',') ?? [],
    permissions: permissions?.split(':') ?? [],
    bpPropertyids,
    companyids: Array.isArray(companyids) ? companyids : [companyids],
    isAuthenticated: true,
  };
};
