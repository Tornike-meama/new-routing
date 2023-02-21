import { memo } from 'react';
import { AuthorizedPublicRouteProps } from "../types/wrapper.types";

export const AuthorizedPublicRoute = ({Component, UnAuthorizedPage, isLogedIn}: AuthorizedPublicRouteProps) => {
 
  if(!isLogedIn) {
    return <UnAuthorizedPage />
  }
  
  return <Component />
};

export default memo(AuthorizedPublicRoute);