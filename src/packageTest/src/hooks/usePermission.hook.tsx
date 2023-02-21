import { UserPermissionReturnType } from "../types";
import { useClaimns, useUserActions } from "./useClaims.hook";


export function usePersmissions(
  pageKey?: string
): UserPermissionReturnType {
  const userClaims = useClaimns();
  const actionsByKey = useUserActions();

  return  { actions: (pageKey && actionsByKey[pageKey]) ? actionsByKey[pageKey] : {}, userClaims };
};