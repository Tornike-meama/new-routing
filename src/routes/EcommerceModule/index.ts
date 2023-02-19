import {Modules} from "@Tornike-meama/ds-routing"
import { ProductRoutes } from "./product";

export const EcommerceModule: Modules = {
  moduleKey: "ProjectPolicys_ECommerceModule",
  name: "Ecommerce_module",
  showDrawer: true,
  subPages: [...ProductRoutes],
};
