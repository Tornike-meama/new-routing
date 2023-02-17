export type Actions = {
  [get: string]: boolean;
  add: boolean;
  update: boolean;
  remove: boolean;
};

export type Acceseses = Record<string, string> & {
  pageKey: string;
  get?: string;
  add?: string;
  update?: string;
  remove?: string;
};

export type ActionsKeys = {
  get: string;
  add: string;
  update: string;
  remove: string;
};

export type ChildRoute = {
  pageKey: string;
  actions: { [key: string]: boolean };
  actionkeys: ActionsKeys;
  routes: any;
};

export type PageRoutes = {
  pageKeys: Acceseses;
  url: string;
  name: string;
  showDrawer: boolean;
  component: any;
  subPages?: PageRoutes[];
};

export type Modules = {
  moduleKey: string;
  name: string;
  showDrawer: boolean;
  subPages: PageRoutes[];
};
