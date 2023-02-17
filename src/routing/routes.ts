import { allModule } from "../routes";
import { PageRoutes } from "../routes/types/route.types";
import { DrawerItem, DrawerRoutes, RoutesType } from "./route.types";

//routes
function getRoutesStructure(
  pages: PageRoutes[],
  moduleName: string,
  moduleKey: string
): RoutesType[] {
  let arr: RoutesType[] = [];
  pages.forEach((page: PageRoutes) => {
    if (!page.component) {
      return arr.push(
        ...getRoutesStructure(
          page.subPages ?? [],
          `${moduleName}/${page.url ?? page.name}`,
          page.pageKeys.pageKey
        )
      );
    }
    const route = {
      to: `${moduleName}/${page.url ?? page.name}`,
      moduleKey: moduleKey,
      pageKeys: page.pageKeys,
      Component: page.component,
    };
    arr.push(route);
    if (page.subPages?.length) {
      return arr.push(
        ...getRoutesStructure(page.subPages, route.to, page.pageKeys.pageKey)
      );
    }
  });
  return arr;
}

function getRoutes() {
  return allModule.flatMap((module) =>
    getRoutesStructure(module.subPages, module.name, module.moduleKey)
  );
}

//drawer
function getDrawerItems(claims: string[]) {
  const drawerItems = allModule.reduce<DrawerItem[]>((acc, module) => {
    if (!module.showDrawer) return acc;

    if (claims.includes(module.moduleKey)) {
      let drawerItem = {
        name: module.name,
        to: undefined,
        childItems: [],
      } as DrawerItem;

      drawerItem.childItems = getDrawerItemRecurse(
        module.subPages,
        `/${module.name}`,
        claims
      );

      acc.push(drawerItem);
    } else {
      let drawerItem = {
        name: module.name,
        to: undefined,
        childItems: [],
      } as DrawerItem;

      drawerItem.childItems = getDrawerItemRecurse(
        module.subPages,
        `/${module.name}`,
        claims
      );

      acc.push(drawerItem);
    }
    return acc;
  }, []);

  return drawerItems;
}

function getDrawerItemRecurse(
  pages: PageRoutes[],
  prevUrl: string,
  claims: string[]
): DrawerItem[] {
  return pages.reduce<DrawerItem[]>((acc, page) => {
    if (
      claims.some(
        (key) => key === page.pageKeys.pageKey || key === page.pageKeys.get
      ) &&
      page.showDrawer
    ) {
      let subPageItem = {
        name: page.name,
        to: page.url ? `${prevUrl}/${page.url}` : null,
        childItems: [],
      } as DrawerItem;

      if (page.subPages !== undefined && page.subPages?.length > 0) {
        subPageItem.childItems = getDrawerItemRecurse(
          page.subPages,
          subPageItem.to ?? `${prevUrl}/${page.name.split(" ").join("")}`,
          claims
        );
        acc.push(subPageItem);
      } else acc.push(subPageItem);

      return acc;
    } else return acc;
  }, []);
}

export function getDrawerRoutes(claims: string[]): DrawerRoutes {
  const routes = getRoutes();
  const drawer = getDrawerItems(claims);
  return { routes, drawer };
}

//accasses
export const roles = [
  {
    name: "Developer_1",
    roleId: "ea3f4d0a-f1ca-4f91-399a-08da03714fc2",
    roleName: "Developer",
    roleClaims: [
      "ProjectPolicys_ERPModuleModule",
      "ProjectPolicys_FinancesModule",
      "ProjectPolicys_OffersModule",
      "ProjectPolicys_PaymentModule",
      "ProjectPolicys_CoreModule",
      "ProjectPolicys_B2BHoreka",
      "ProjectPolicys_ProductModule",
      "ProjectPolicys_ECommerceModule",
      "ProjectPolicys_CustomersModule_CustomerGroupPage_AddGroup",
      "ProjectPolicys_CustomersModule_CustomerGroupPage_Remove",
      // "ProjectPolicys_CustomersModule_CustomerPage",
      "ProjectPolicys_CustomersModule_CommentTagsPage",
      "ProjectPolicys_CustomersModule_CommentStatusPage",
      "ProjectPolicys_CustomersModule_CommentPage",
      "ProjectPolicys_CustomersModule_B2BClientCategoriesPage",
      "ProjectPolicys_CustomersModule_B2BClientPage",
      "ProjectPolicys_CustomersModule_B2BClientAddressPage",
      "ProjectPolicys_CustomersModule_DocumentDraftPage",
      "ProjectPolicys_CustomersModule_DocumentPage",
    ],
    modules: [
      "ProjectPolicys_B2BHoreka",
      "ProjectPolicys_CoreModule",
      "ProjectPolicys_CustomersModule",
      "ProjectPolicys_ECommerceModule",
      "ProjectPolicys_ERPModuleModule",
      "ProjectPolicys_FinancesModule",
      "ProjectPolicys_OffersModule",
      "ProjectPolicys_PaymentModule",
      "ProjectPolicys_ProductModule",
    ],
    company: {
      companyId: 1,
      name: "Meama-HQ",
      color: null,
      inherits: false,
    },
  },
];

export const userClaims = [
  "ProjectPolicys_HomeModule",

  "ProjectPolicys_ERPModuleModule",
  "ProjectPolicys_FinancesModule",
  "ProjectPolicys_OffersModule",
  "ProjectPolicys_PaymentModule",
  "ProjectPolicys_CoreModule",
  "ProjectPolicys_B2BHoreka",
  "ProjectPolicys_ProductModule",
  // "ProjectPolicys_ECommerceModule",
  "ProjectPolicys_ECommerceModule_ProductPage_Get",
  // "ProjectPolicys_ECommerceModule_ProductPage_Add",
  "ProjectPolicys_CustomersModule_CustomerPage_donwlaod",
  // "ProjectPolicys_CustomersModule_CustomerPage",
  "ProjectPolicys_CustomersModule_CustomerPage_Get",
  "ProjectPolicys_CustomersModule_CustomerPage_Add",
  "ProjectPolicys_CustomersModule_CustomerPage_Remove",

  "ProjectPolicys_CustomersModule_CustomerSubPage_Add",
  "ProjectPolicys_CustomersModule_CustomerSubPage_Get",
  "ProjectPolicys_CustomersModule_CustomerSub2Page_Get",
  // "ProjectPolicys_CustomersModule_CustomerSubPage",
  // "ProjectPolicys_CustomersModule_CustomerPage_Update",
];