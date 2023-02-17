import { Modules } from "../../routing/route.types";
import { ProductRoutes } from "./product";

export const EcommerceModule: Modules = {
  moduleKey: "ProjectPolicys_ECommerceModule",
  name: "Ecommerce_module",
  showDrawer: true,
  subPages: [...ProductRoutes],
};
