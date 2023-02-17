import { ClientsModule } from "./ClientsModule/index";
import { EcommerceModule } from "./EcommerceModule/index";
import { HomeModule } from "./HomeModule";
import { Modules } from "./types/route.types";

export const allModule: Modules[] = [
  ClientsModule,
  EcommerceModule,
  HomeModule,
];
