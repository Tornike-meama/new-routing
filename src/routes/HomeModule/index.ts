import { AuthorizedPublicKey, Modules } from "@Tornike-meama/ds-routing";
import { HomeRoutes } from "./home";

export const HomeModule: Modules = {
  moduleKey: AuthorizedPublicKey,
  name: "",
  subPages: [...HomeRoutes],
};
