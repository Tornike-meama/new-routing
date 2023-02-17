import { Modules } from "../types/route.types";
import { ClientRoutes } from "./customer";

export const ClientsModule: Modules = {
  moduleKey: "ProjectPolicys_CustomersModule",
  name: "Clients_module",
  showDrawer: true,
  subPages: [...ClientRoutes],
};
