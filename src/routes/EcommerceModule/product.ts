import { PageRoutes } from "../../packageTest";
import ProductPages from "../../pages/ProductPage";

export const ProductPageKeys = {
  pageKey: "ProjectPolicys_ECommerceModule_ProductPage",
  get: "ProjectPolicys_ECommerceModule_ProductPage_Get",
  add: "ProjectPolicys_ECommerceModule_ProductPage_Add",
  downlaodFile: "ProjectPolicys_CustomersModule_ProductPage_donwlaod",
} as const;

export const ProductListRoutes: PageRoutes = {
  url: "products",
  name: "Products page",
  showDrawer: true,
  pageKeys: ProductPageKeys,
  component: ProductPages,
};

export const ProductRoutes: PageRoutes[] = [ProductListRoutes];
