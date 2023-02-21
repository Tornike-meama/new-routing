import { Modules } from "../packageTest";
import { ClientsModule } from "./ClientsModule/index";
import { EcommerceModule } from "./EcommerceModule/index";
import { HomeModule } from "./HomeModule";

export const allModule: Modules[] = [
  ClientsModule,
  EcommerceModule,
  // HomeModule,
];
