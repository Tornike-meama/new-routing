import { Acceseses } from "../routing/route.types";

export type PrivteRouteProps = {
  Component: () => JSX.Element;
  UnAuthorizedPage: () => JSX.Element;
  pageKeys: Acceseses;
  moduleKey: string;
  isLogedIn: boolean;
};
export type Actions = {
  get: boolean;
  add: boolean;
  update: boolean;
  remove: boolean;
  [key: string]: boolean;
};
