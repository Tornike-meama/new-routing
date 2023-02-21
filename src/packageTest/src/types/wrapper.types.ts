import { Acceseses } from "./route.types";
import { ReactNode } from 'react';

export type PrivteRouteProps = {
  Component: () => JSX.Element;
  unAuthorizedPage: ReactNode;
  pageKey: string;
  isLogedIn: boolean;
};

export type UnAuthorizedRouteProps = {
  Component: () => JSX.Element;
  HomePageComponent: () => JSX.Element;
  redirectToHome: () => void;
  isLogedIn: boolean;
};

export type AuthorizedPublicRouteProps = {
  Component: () => JSX.Element;
  UnAuthorizedPage: () => JSX.Element;
  isLogedIn: boolean;
};
