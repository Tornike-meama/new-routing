import { Modules } from "@Tornike-meama/ds-routing";
import { ClientsModule } from "./ClientsModule/index";
import { EcommerceModule } from "./EcommerceModule/index";
import { HomeModule } from "./HomeModule";
import { UnAtuhorizedModule } from "./UnAuthorized";

export const allModule: Modules[] = [
  ClientsModule,
  EcommerceModule,
  UnAtuhorizedModule,
  HomeModule,
];
