import { PrivteRouteProps } from "../types/wrapper.types";
import usePersmissions from "../hooks/usePermission.hook";

const PrivateRoute = ({
  Component,
  UnAuthorizedPage,
  moduleKey,
  pageKeys,
  isLogedIn,
}: PrivteRouteProps) => {
  const {actions} = usePersmissions(moduleKey, pageKeys);

  if (!isLogedIn) return <UnAuthorizedPage />;

  if (!actions.get) return <h1>No permission</h1>;

  return <Component />;
};

export default PrivateRoute;
