import { PageRoutes } from "@Tornike-meama/ds-routing";
import B2BClients from "../../pages/B2BClients";
import CustomerAddOrUpdate from "../../pages/ClientAddOrUpdate";
import ClientSubPage from "../../pages/ClientSubPage";
import Customers from "../../pages/CustomerPage";

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

export const ClientAddOrUpdate = {
  pageKey: "ProjectPolicys_CustomersModule_CustomerSub2AddOrUpdatePage",
  add: "ProjectPolicys_CustomersModule_CustomerSub2AddOrUpdatePage_Add",
  get: "ProjectPolicys_CustomersModule_CustomerSub2AddOrUpdatePage_Get",
} as const;

export const ListRoute: PageRoutes = {
  url: "",
  name: "customers_base",
  showDrawer: true,
  pageKeys: ClientPageKeys,
  component: null,
  subPages: [
    {
      url: "customerssubpage",
      name: "customers sub page",
      showDrawer: true,
      pageKeys: ClientSubPageKeys,
      component: ClientSubPage,
      subPages: [
        {
          url: "addOrUpdate/:id",
          name: "addOrUpdatewithId",
          showDrawer: false,
          pageKeys: ClientAddOrUpdate,
          component: CustomerAddOrUpdate,
        },
        {
          url: "addOrUpdate",
          name: "addOrUpdatewithoutId",
          showDrawer: false,
          pageKeys: ClientAddOrUpdate,
          component: CustomerAddOrUpdate,
        },
      ],
    },
    {
      url: "b2b",
      name: "b2b client",
      showDrawer: true,
      pageKeys: ClientSubPageKeys2,
      component: B2BClients,
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
