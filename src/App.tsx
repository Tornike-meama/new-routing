import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Route, Routes, useNavigate } from "react-router";
import {DrawerItem, RoutesType, PrivateRoute, PermissionProvider, useInitRouter, UnAuthorizedRoute} from "./packageTest/index";

import Login from "./pages/LogIn";

import "./App.css";
import { allModule } from "./routes";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import AuthorizedPublicRoute from "./packageTest/src/components/AuthorizedPublicRoute";

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
  // "ProjectPolicys_ECommerceModule_ProductPage",
  "ProjectPolicys_ECommerceModule_ProductPage_Get",
  // "ProjectPolicys_CustomersModule_ProductPage_donwlaod",
  // "ProjectPolicys_ECommerceModule_ProductPage_Add",
  // "ProjectPolicys_CustomersModule_CustomerPage",
  "ProjectPolicys_CustomersModule_CustomerSub2AddOrUpdatePage_Add",
  "ProjectPolicys_CustomersModule_CustomerSub2AddOrUpdatePage_Get",
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
  const navigate = useNavigate();

  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [logedIn, setLogedIn] = useState<boolean>(false);
  const [userClaimsState, setUserClaimsState] = useState<string[]>([]);

  const { drawerItems, routes, actions } = useInitRouter(userClaimsState, allModule);
  
  const loginhandler = () => {
    GetUserData()
    .then((claims: string[]) => {
      setUserClaimsState(claims);
      setLogedIn(true);
    })
    .catch(() => setLogedIn(false));
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
        setUserClaimsState(claims);
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
              ? generateDrawerExtenstion(drawerItems, 
                    (page: DrawerItem) => page.to 
                      ? <Link className="subPagesLink" to={page.to ?? ""} key={page.name}>{page.name}</Link> 
                      : page.name ) : <li>you must log in</li>}
          </ul>
        </div>
      </header>
     <div style={{padding: "0 20px"}}>
      <PermissionProvider userClaims={userClaimsState} userActions={actions}>
          <Routes>
            {/* privitae routes by router  */}
            {routes.map((o: RoutesType) => {
              const Page = o.Component;
              return (
                <Route
                  key={o.moduleKey}
                  path={o.to}
                  element={
                    <PrivateRoute
                      isLogedIn={logedIn}
                      pageKey={o.pageKeys?.pageKey}
                      component={<Page/>}
                      unAuthorizedPage={<Login
                        loginhandler={loginhandler}
                        logOuthandler={logOuthandler}
                      />}
                    />
                  }
                />
              );
            })};

          <Route 
            path="reset-password" 
            element={<UnAuthorizedRoute 
                      isLogedIn={logedIn} 
                      redirectToHome={() => navigate("/")}
                      component={<ResetPassword />} 
                      homePageComponent={<Home />} 
                      /> }  
          />

          <Route 
            path="/" 
            element={<AuthorizedPublicRoute 
                      isLogedIn={logedIn} 
                      unAuthorizedPage={<Login loginhandler={loginhandler} logOuthandler={logOuthandler} />}
                      component={<Home />} 
                    /> }  
          />

          <Route path='*' element={<h1>404 not found or no permission</h1>}/>
          </Routes>
      </PermissionProvider>
     </div>
    </div>
  );
}

export default App;