import { Modules } from "@Tornike-meama/ds-routing";
import { EcommerceModule, ClientsModule } from "./private";
import { HomeModule } from "./authorizedPublic";
import { UnAtuhorizedModule } from "./unAuthorized";

export const allModule: Modules[] = [
  ClientsModule,
  EcommerceModule,
  UnAtuhorizedModule,
  HomeModule,
];

export * from "./unAuthorized";
export * from "./authorizedPublic";
export * from "./private";
