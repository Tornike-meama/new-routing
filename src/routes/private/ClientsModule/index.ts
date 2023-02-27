
import { Modules } from "@Tornike-meama/ds-routing";
import { ClientRoutes } from "./customer";

export const ClientsModule: Modules = {
  moduleKey: "ProjectPolicys_CustomersModule",
  name: "Clients_module",
  showDrawer: true,
  subPages: [...ClientRoutes],
};
