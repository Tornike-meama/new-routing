import { PageRoutes } from "@Tornike-meama/ds-routing";
import Home from "../../pages/Home";

export const HomePageKeys = {
  pageKey: "ProjectPolicys_ECommerceModule_HomePage",
  get: "ProjectPolicys_ECommerceModule_HomePage_Get",
  add: "ProjectPolicys_ECommerceModule_HomePage_Add",
} as const;

export const HomeListRoutes: PageRoutes = {
  url: "/",
  name: "Homes page",
  showDrawer: true,
  pageKeys: HomePageKeys,
  component: Home,
};

export const HomeRoutes: PageRoutes[] = [HomeListRoutes];
