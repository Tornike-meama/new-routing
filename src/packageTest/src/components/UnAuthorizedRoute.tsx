import { memo } from 'react';
import { UnAuthorizedRouteProps } from "../types";

export const UnAuthorizedRoute = ({HomePageComponent, Component, redirectToHome, isLogedIn} : UnAuthorizedRouteProps) => {

  if(!isLogedIn) {
    return <Component />
  };

  redirectToHome();
  return <HomePageComponent />
};

export default memo(UnAuthorizedRoute);