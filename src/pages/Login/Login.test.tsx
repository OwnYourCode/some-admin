import { Login } from './Login';
import { render } from '../../test-utils';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (k: string) => {
      if (k === 'button.signin') {
        return 'Sign in';
      } else if (k === 'page.signin.text.1') {
        return 'Welcome to the';
      } else if (k === 'page.signin.text.2') {
        return 'Admin';
      } else if (k === 'page.signin.text.3') {
        return 'Partner Portal';
      }
    },
  }),
}));

describe('Login page', () => {
  test('should not be undefined', function () {
    const component = render(<Login />);

    expect(component).toBeDefined();
  });

  test('should match snapshot', function () {
    const component = render(<Login />);

    expect(component).toMatchSnapshot();
  });

  test('should render h1 with external link', function () {
    const { getByText, debug } = render(<Login />);
    debug();

    const headingStart = getByText(/welcome to the/i);
    const externalLink = getByText(/admin/i);
    const headingEnd = getByText(/partner portal/i);
    debug();

    expect(headingStart).toBeInTheDocument();
    expect(headingStart.tagName).toBe('H1');
    expect(externalLink).toBeInTheDocument();
    expect(externalLink.tagName).toBe('A');
    expect(externalLink).toHaveAttribute('target', '_blank');
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(externalLink).toHaveAttribute('href', 'https://www.example.com/');
    expect(headingEnd).toBeInTheDocument();
  });

  test('should render sign in button', function () {
    const { getByText } = render(<Login />);

    const signInBtn = getByText(/sign in/i);

    expect(signInBtn).toBeInTheDocument();
    expect(signInBtn.tagName).toBe('BUTTON');
  });
});
