import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import {DrawerItem, RoutesType, getDrawerRoutes, PrivateRoute, PermissionProvider} from "@Tornike-meama/ds-routing";

import Login from "./pages/LogIn";

import "./App.css";
import { allModule } from "./routes";

const tokenKey = "userToken";

const Static_User_Claims = [
  "ProjectPolicys_HomeModule",

  "ProjectPolicys_ERPModuleModule",
  "ProjectPolicys_FinancesModule",
  "ProjectPolicys_OffersModule",
  "ProjectPolicys_PaymentModule",
  "ProjectPolicys_CoreModule",
  "ProjectPolicys_B2BHoreka",
  "ProjectPolicys_ProductModule",
  // "ProjectPolicys_ECommerceModule",
  "ProjectPolicys_ECommerceModule_ProductPage_Get",
  // "ProjectPolicys_ECommerceModule_ProductPage_Add",
  "ProjectPolicys_CustomersModule_CustomerPage_donwlaod",
  // "ProjectPolicys_CustomersModule_CustomerPage",
  "ProjectPolicys_CustomersModule_CustomerPage_Get",
  "ProjectPolicys_CustomersModule_CustomerPage_Add",
  "ProjectPolicys_CustomersModule_CustomerPage_Remove",

  "ProjectPolicys_CustomersModule_CustomerSubPage_Add",
  "ProjectPolicys_CustomersModule_CustomerSubPage_Get",
  "ProjectPolicys_CustomersModule_CustomerSub2Page_Get",
  // "ProjectPolicys_CustomersModule_CustomerSubPage",
  // "ProjectPolicys_CustomersModule_CustomerPage_Update",
];


function generateDrawerExtenstion(items: DrawerItem[], callBack: (page: DrawerItem) => ReactNode) {
  return items.map((page: DrawerItem) => {
    if (page?.childItems?.length) {
      return <ul className="ul">
              {callBack(page)}
              <li className="subPage">{generateDrawerExtenstion(page.childItems, callBack)}</li>
            </ul>
    } else {
      return <li>{callBack(page)}</li>
    }
  });
};


function App() {
  const [routes, setRoutes] = useState<RoutesType[]>([]);
  const [drawer, setDrawer] = useState<DrawerItem[]>([]);

  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [logedIn, setLogedIn] = useState<boolean>(false);
  const [userClaimsState, setUserClaimsState] = useState<string[]>([])

  const loginhandler = () => {
    localStorage.setItem(tokenKey, "tes_user_token");
    setLogedIn(true);
  };
  const logOuthandler = () => {
    localStorage.removeItem(tokenKey);
    setLogedIn(false);
  };

  async function GetUserData(): Promise<string[]> {
    setShowLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Static_User_Claims);
        setShowLoading(false);
      }, 1000);
    });
  }

  useEffect(() => {
    GetUserData()
      .then((claims: string[]) => {
        const { routes, drawer } = getDrawerRoutes(claims, allModule);
        setUserClaimsState(claims);
        setRoutes(routes);
        setDrawer(drawer);
        setLogedIn(true);
      })
      .catch(() => setLogedIn(false));
  }, []);

  if (showLoading) return <h1>Loading</h1>;

  function generateDrawerItems(items: DrawerItem[]): JSX.Element[] {
    return items.map((page: DrawerItem) => {
      if (page?.childItems?.length) {
        return page.to ? (
          <li>
            <Link className="subPages" to={page.to ?? ""} key={page.name}>
              <div>{page.name}</div>
              {generateDrawerItems(page.childItems)}
            </Link>
          </li>
        ) : (
          <li className="subPages" key={page.name}>
            <div>{page.name}</div>
            {generateDrawerItems(page.childItems)}
          </li>
        );
      } else {
        return page.to ? (
          <li>
            <Link className="subPages" to={page.to ?? ""} key={page.name}>
              {page.name}
            </Link>
          </li>
        ) : (
          <li>{page.name}</li>
        );
      }
    });
  }


  return (
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          <ul className="ul">
          {logedIn && <li><div onClick={logOuthandler}>Log out</div></li>}
            {logedIn 
              ? generateDrawerExtenstion(drawer, 
                    (page: DrawerItem) => page.to 
                      ? <Link className="subPagesLink" to={page.to ?? ""} key={page.name}>{page.name}</Link> 
                      : page.name ) : <li>test</li>}
          </ul>
        </div>
      </header>
     <PermissionProvider userClaims={userClaimsState}>
        <Routes>
          {/* privitae routes by router  */}
          {routes.map((o: RoutesType) => {
            return (
              <Route
                key={o.moduleKey}
                path={o.to}
                element={
                  <PrivateRoute
                    isLogedIn={logedIn}
                    moduleKey={o.moduleKey}
                    pageKeys={o.pageKeys}
                    Component={o.Component}
                    UnAuthorizedPage={() => (
                      <Login
                        loginhandler={loginhandler}
                        logOuthandler={logOuthandler}
                      />
                    )}
                  />
                }
              />
            );
          })}
        </Routes>
     </PermissionProvider>
    </div>
  );
}

export default App;