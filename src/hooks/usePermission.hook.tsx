import { createContext, useContext} from "react";
import { Acceseses } from "../routing/route.types";
import { Actions } from "../wrappers/wrapper.types";

type UserPermissionReturnType = {
  setUserClaims: any;
  userClaims: string[];
  actions: Actions
}

type PermissionContextType = {
  userClaims: string[];
  setUserClaims?: () => {};
}

export const PermissionsContext = createContext<PermissionContextType>({userClaims: []})

function usePersmissions( moduleKey?: string, pageKeys?: Acceseses): UserPermissionReturnType {
  const {userClaims, setUserClaims} = useContext(PermissionsContext);
  let actions = {} as Actions;

  if(!pageKeys || !moduleKey) {
    return {actions, userClaims, setUserClaims};
  }

  const hasPageAccess = userClaims.some((key: string) => key === moduleKey || key === pageKeys.pageKey);
  Object.getOwnPropertyNames(pageKeys).forEach((key) => (actions[key] = hasPageAccess || userClaims.includes(pageKeys[key]))
  );
  return {actions, userClaims, setUserClaims};
}


export default usePersmissions;