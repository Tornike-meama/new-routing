import { createContext, useContext} from "react";
import { Acceseses } from "../types/route.types";
import { PermissionContextType, UserPermissionReturnType } from "../types/permission.types";
import { Actions } from "../types/wrapper.types";

export const PermissionsContext = createContext<PermissionContextType>({userClaims: []})

function usePersmissions( moduleKey?: string, pageKeys?: Acceseses): UserPermissionReturnType {
  const {userClaims} = useContext(PermissionsContext);
  let actions = {} as Actions;

  if(!pageKeys || !moduleKey) {
    return {actions, userClaims};
  }

  const hasPageAccess = userClaims.some((key: string) => key === moduleKey || key === pageKeys.pageKey);
  Object.getOwnPropertyNames(pageKeys).forEach((key) => (actions[key] = hasPageAccess || userClaims.includes(pageKeys[key]))
  );
  return {actions, userClaims};
}


export default usePersmissions;