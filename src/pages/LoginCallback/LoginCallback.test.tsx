import { render } from '../../test-utils';
import { LoginCallback } from './LoginCallback';

describe('LoginCallback', function () {
  test('should not be undefined', () => {
    const component = render(<LoginCallback />);

    expect(component).toBeDefined();
  });
});
