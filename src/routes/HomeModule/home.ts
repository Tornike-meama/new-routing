import { AuthorizedPublicKey, PageRoutes } from "@Tornike-meama/ds-routing";
import Home from "../../pages/Home";

export const HomePageKeys = {
  pageKey: "ProjectPolicys_ECommerceModule_HomePage",
  get: "ProjectPolicys_ECommerceModule_HomePage_Get",
  add: "ProjectPolicys_ECommerceModule_HomePage_Add",
} as const;

export const HomeListRoutes: PageRoutes = {
  url: "/",
  name: "Homes page",
  pageKeys: {pageKey: AuthorizedPublicKey},
  component: Home,
};

export const HomeListRoutes1: PageRoutes = {
  url: "home",
  name: "Homes page with home",
  pageKeys: {pageKey: AuthorizedPublicKey},
  component: Home,
};


export const HomeRoutes: PageRoutes[] = [HomeListRoutes1];
