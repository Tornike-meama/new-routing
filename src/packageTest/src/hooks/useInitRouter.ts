import { Modules } from "../types";
import { initRouter } from '../helpers/routing.helpers';

export const useInitRouter = (claims: string[], allModule: Modules[]) => {
  const router = initRouter(claims, allModule);
  return router;
};