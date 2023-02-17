import { useNavigate } from "react-router";
import { userClaims } from "../routing/routes";
import { PageProps } from "./types/componentProps.types";
import { Acceseses } from "./types/route.types";

export type PrivteRouteProps = {
  Component: (props: PageProps) => JSX.Element;
  UnAuthorizedPage: (props: PageProps) => JSX.Element;
  pageKeys: Acceseses;
  moduleKey: string;
  isLogedIn: boolean;
};
type Actions = {
  get: boolean;
  add: boolean;
  update: boolean;
  remove: boolean;
  [key: string]: boolean;
};

export function getPersmissions(
  moduleKey: string,
  pageKeys: Acceseses
): Actions {
  let actions = {} as Actions;

  const hasPageAccess = userClaims.some(
    (o) => o === moduleKey || o === pageKeys.pageKey
  );
  Object.getOwnPropertyNames(pageKeys).forEach(
    (key) =>
      (actions[key] = hasPageAccess || userClaims.includes(pageKeys[key]))
  );
  return actions;
}

const PrivateRoute = ({
  Component,
  UnAuthorizedPage,
  moduleKey,
  pageKeys,
  isLogedIn,
}: PrivteRouteProps) => {
  const navigate = useNavigate();

  console.log(isLogedIn, "isLogedIn");
  const pagePermission = getPersmissions(moduleKey, pageKeys);

  if (!isLogedIn) return <UnAuthorizedPage actions={pagePermission} />;

  if (!pagePermission.get) return <h1>No permission</h1>;

  return <Component actions={pagePermission} />;
};

export default PrivateRoute;
