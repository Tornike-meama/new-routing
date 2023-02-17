import { Modules } from "../../routing/route.types";
import { HomeRoutes } from "./home";

export const HomeModule: Modules = {
  moduleKey: "ProjectPolicys_HomeModule",
  name: "",
  showDrawer: false,
  subPages: [...HomeRoutes],
};
