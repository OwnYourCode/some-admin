import { screen } from '@testing-library/react';
import { render } from '../test-utils';
import App from './App';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (k: string) => {
      if (k === 'button.signin') {
        return 'Sign in';
      }
    },
  }),
}));

describe('App', () => {
  test("shows `Loading...` message at first and then shows `Login` page after it's loaded", async function () {
    const { getByText } = render(<App />);

    const lazyElement = getByText(/Loading.../i);
    expect(lazyElement).toBeInTheDocument();

    const signInBtn = await screen.findByText(/sign in/i);
    expect(signInBtn).toBeInTheDocument();
  });
});
