import Home from "../../pages/Home";
import { PageRoutes } from "../types/route.types";

export const HomePageKeys = {
  pageKey: "ProjectPolicys_ECommerceModule_HomePage",
  get: "ProjectPolicys_ECommerceModule_HomePage_Get",
  add: "ProjectPolicys_ECommerceModule_HomePage_Add",
  downlaodFile: "ProjectPolicys_CustomersModule_CustomerPage_donwlaod",
} as const;

export const HomeListRoutes: PageRoutes = {
  url: "/",
  name: "Homes page",
  showDrawer: true,
  pageKeys: HomePageKeys,
  component: Home,
};

export const HomeRoutes: PageRoutes[] = [HomeListRoutes];
