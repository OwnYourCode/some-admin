import { FC } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { Header } from '../Header/Header';

export const Layout: FC<RouteProps> = ({ children, ...restProps }) => {
  return (
    <Route {...restProps}>
      <Header />
      {children}
    </Route>
  );
};
