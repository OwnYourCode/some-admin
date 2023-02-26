import { createUserName } from './createUserName';

describe('createUserName', () => {
  it('should return full name if firstName and lastName passed', () => {
    const firstName = 'Alex';
    const lastName = 'Miro';

    const name = createUserName(firstName, lastName);

    expect(name).toBe('Alex Miro');
  });
  it('should return firstName if firstName only passed', () => {
    const firstName = 'Alex';

    const name = createUserName(firstName);

    expect(name).toBe('Alex');
  });
  it('should return firstName if lastName empty string', () => {
    const firstName = 'Alex';
    const lastName = '';

    const name = createUserName(firstName, lastName);

    expect(name).toBe('Alex');
  });
  it('should return empty string', () => {
    const firstName = '';
    const lastName = '';

    const name = createUserName(firstName, lastName);

    expect(name).toBe('');
  });
});
