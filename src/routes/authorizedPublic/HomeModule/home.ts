import { AuthorizedPublicKey, PageRoutes } from "@Tornike-meama/ds-routing";
import Home from "../../../pages/Home";


export const HomeListRoutes: PageRoutes = {
  url: "/",
  name: "Homes page",
  pageKeys: {pageKey: AuthorizedPublicKey},
  component: Home,
};

export const HomeListRoutes1: PageRoutes = {
  url: "/",
  name: "Homes page with home",
  pageKeys: {pageKey: AuthorizedPublicKey},
  component: Home,
};


export const HomeRoutes: PageRoutes[] = [HomeListRoutes1];
