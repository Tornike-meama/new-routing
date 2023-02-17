import CustomerAddOrUpdate from "../../pages/ClientAddOrUpdate";
import ClientSubPage from "../../pages/ClientSubPage";
import Customers from "../../pages/CustomerPage";
import { PageRoutes } from "../../routing/route.types";

export const ClientPageKeys = {
  pageKey: "ProjectPolicys_CustomersModule_CustomerPage",
  add: "ProjectPolicys_CustomersModule_CustomerPage_Add",
  get: "ProjectPolicys_CustomersModule_CustomerPage_Get",
  remove: "ProjectPolicys_CustomersModule_CustomerPage_Remove",
  update: "ProjectPolicys_CustomersModule_CustomerPage_Update",
} as const;

export const ClientSubPageKeys = {
  pageKey: "ProjectPolicys_CustomersModule_CustomerSubPage",
  add: "ProjectPolicys_CustomersModule_CustomerSubPage_Add",
  get: "ProjectPolicys_CustomersModule_CustomerSubPage_Get",
} as const;

export const ClientSubPageKeys2 = {
  pageKey: "ProjectPolicys_CustomersModule_CustomerSub2Page",
  add: "ProjectPolicys_CustomersModule_CustomerSub2Page_Add",
  get: "ProjectPolicys_CustomersModule_CustomerSub2Page_Get",
} as const;

export const ListRoute: PageRoutes = {
  url: "customers_base",
  name: "customers_page",
  showDrawer: true,
  pageKeys: ClientPageKeys,
  component: Customers,
  subPages: [
    {
      url: "clientSubPage",
      name: "customers sub page",
      showDrawer: true,
      pageKeys: ClientSubPageKeys,
      component: ClientSubPage,
      subPages: [
        {
          url: "addOrUpdate",
          name: "addOrUpdate",
          showDrawer: true,
          pageKeys: ClientPageKeys,
          component: CustomerAddOrUpdate,
        },
      ],
    },
    {
      url: "clientSubPage2",
      name: "customers sub page2",
      showDrawer: true,
      pageKeys: ClientSubPageKeys2,
      component: ClientSubPage,
    },
  ],
};

export const AddOrUpdate: PageRoutes = {
  url: "addOrUpdate",
  name: "addOrUpdate",
  showDrawer: false,
  pageKeys: ClientPageKeys,
  component: CustomerAddOrUpdate,
};

export const ClientRoutes: PageRoutes[] = [ListRoute, AddOrUpdate];
