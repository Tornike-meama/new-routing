import { Acceseses, UserPermissionReturnType } from "../types";
import { useClaimns, useUserActions } from "./useClaims.hook";


export function usePersmissions(
  pageKeys?: Acceseses
): UserPermissionReturnType {
  const userClaims = useClaimns();
  const actionsByKey = useUserActions();

  return  { actions: pageKeys ? actionsByKey[pageKeys.pageKey] : {}, userClaims };
};