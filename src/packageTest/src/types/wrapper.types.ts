import { Acceseses } from "./route.types";
import { ReactNode } from 'react';

export type PrivteRouteProps = {
  Component: () => JSX.Element;
  unAuthorizedPage: ReactNode;
  pageKeys: Acceseses;
  isLogedIn: boolean;
};

