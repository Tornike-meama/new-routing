import {Modules} from "@Tornike-meama/ds-routing"
import { HomeRoutes } from "./home";

export const HomeModule: Modules = {
  moduleKey: "ProjectPolicys_HomeModule",
  name: "",
  showDrawer: false,
  subPages: [...HomeRoutes],
};
