import { PrivteRouteProps } from "./types.wrapper";
import usePersmissions from "../hooks/usePermission.hook";

const PrivateRoute = ({
  Component,
  UnAuthorizedPage,
  moduleKey,
  pageKeys,
  isLogedIn,
}: PrivteRouteProps) => {
  const {actions} = usePersmissions(moduleKey, pageKeys);

  if (!isLogedIn) return <UnAuthorizedPage actions={actions} />;

  if (!actions.get) return <h1>No permission</h1>;

  return <Component actions={actions} />;
};

export default PrivateRoute;
