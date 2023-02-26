import { Suspense, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Spinner } from './components/Spinner/Spinner';
import './i18n';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Suspense fallback={<Spinner />}>
          <App />
        </Suspense>
      </ChakraProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
