import { Acceseses } from "../routes/types/route.types";

export type DrawerItem = {
  name: string;
  to?: string;
  childItems?: DrawerItem[];
};

export type RoutesType = {
  to: string;
  moduleKey: string;
  pageKeys: Acceseses;
  Component: any;
};

export type DrawerRoutes = {
  drawer: DrawerItem[];
  routes: RoutesType[];
};
