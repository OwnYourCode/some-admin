import { FC, ReactElement, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, RenderOptions } from '@testing-library/react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { store } from './app/store';
import { Spinner } from './components/Spinner/Spinner';

const AllProviders: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Suspense fallback={<Spinner />}>
          <Router>{children}</Router>
        </Suspense>
      </ChakraProvider>
    </Provider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) => {
  return render(ui, { wrapper: AllProviders, ...options });
};

export * from '@testing-library/react';

export { customRender as render };
