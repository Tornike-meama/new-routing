import { PageProps } from "../routes/types/componentProps.types";
import { Acceseses } from "../routing/route.types";

export type PrivteRouteProps = {
  Component: (props: PageProps) => JSX.Element;
  UnAuthorizedPage: (props: PageProps) => JSX.Element;
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
