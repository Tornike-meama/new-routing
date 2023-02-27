
import { Modules, PageRoutes, UnAuthorizedKey } from '@Tornike-meama/ds-routing';
import ResetPassword from '../../pages/ResetPassword';


export const ResetPasswordRoute : PageRoutes = {
  url: "reset-password",
  name: "reset password",
  pageKeys: {pageKey: UnAuthorizedKey},
  component: ResetPassword,
};


export const UnAtuhorizedModule: Modules = {
  moduleKey: UnAuthorizedKey,
  name: "",
  subPages: [ResetPasswordRoute],
};