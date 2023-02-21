
import { useMemo } from "react";
import { Modules } from "../types";
import { initRouter } from '../helpers/routing.helpers';

export const useInitDSRouter = (claims: string[], allModule: Modules[]) => {
  return useMemo(() => initRouter(claims, allModule), [allModule, claims])
};