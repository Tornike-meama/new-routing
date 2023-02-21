import React, { memo } from "react";
import { usePersmissions } from "../hooks";
import { PrivteRouteProps } from "../types";

export const PrivateRoute = ({
  component,
  unAuthorizedPage,
  pageKey,
  isLogedIn,
}: PrivteRouteProps) => {
  const {actions} = usePersmissions(pageKey);

  if (!isLogedIn) return <React.Fragment>{unAuthorizedPage}</React.Fragment>;

  if (!actions.get) return <h1>No permission</h1>;

  return <React.Fragment>{component}</React.Fragment>
};

export default memo<PrivteRouteProps>(PrivateRoute);
