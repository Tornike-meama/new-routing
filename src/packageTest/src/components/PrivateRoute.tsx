import React, { memo } from "react";
import { usePersmissions } from "../hooks";
import { PrivteRouteProps } from "../types";

export const PrivateRoute = ({
  Component,
  unAuthorizedPage,
  pageKeys,
  isLogedIn,
}: PrivteRouteProps) => {
  const {actions} = usePersmissions(pageKeys);

  if (!isLogedIn) return <React.Fragment>{unAuthorizedPage}</React.Fragment>;

  if (!actions.get) return <h1>No permission</h1>;

  return <Component />;
};

export default memo<PrivteRouteProps>(PrivateRoute);
