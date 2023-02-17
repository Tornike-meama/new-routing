import { Modules } from "../../types/route.types";
import { ProductRoutes } from "./product";

export const EcommerceModule: Modules = {
  moduleKey: "ProjectPolicys_ECommerceModule",
  name: "Ecommerce_module",
  showDrawer: true,
  subPages: [...ProductRoutes],
};
