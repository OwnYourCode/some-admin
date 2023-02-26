export const createUserName = (firstName: string, lastName?: string) => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  if (firstName) {
    return firstName;
  }

  return '';
};
