import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Route, Routes, useNavigate } from "react-router";
import {DrawerItem, RoutesType, PrivateRoute, PermissionProvider, useInitDSRouter, UnAuthorizedRoute, AuthorizedPublicRoute} from "@Tornike-meama/ds-routing";

import Login from "./pages/LogIn";

import "./App.css";
import { allModule } from "./routes";
import Home from "./pages/Home";
import { API } from "./api";

const tokenKey = "userToken";

type LoginRepsonse = {
  refreshToken: string;
  token: string;
}

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

  const { drawerItems, routes: {privateRoutes, unAuthorizedRoutes, authorizedPublicRoutes}, actions } = useInitDSRouter(userClaimsState, allModule);
  // unAuhorizedroutes?.map((o: any) => console.log(o, 'ooo'))
  // console.log(auhorizePublicdroutes, "unAuhorizedroutes");
  
  const loginhandler = async () => {
    let res = await API.post<LoginRepsonse>("/login", {email: "toko7bardanashvili@gmail.com", password: "Asdasd!23", withRefreshToken: true} );
    if(res?.data && res.data?.token) {
      API.setTokenInLocalStorage(res.data.token);
      API.setRefreshTokenInLocalStorage(res.data.refreshToken);
    }
    GetUserData()
    .then((data: any) => {
      const claims: string[] = data.user?.roles?.flatMap((role: any) => role?.roleClaims?.map((o: string) => o));
      setUserClaimsState(claims);
      setLogedIn(true);
      return claims;
    })
    // .catch(() => setLogedIn(false));
    // localStorage.setItem(tokenKey, "tes_user_token");
    // setLogedIn(false);
  };
  
  const logOuthandler = () => {
    localStorage.removeItem(tokenKey);
    setLogedIn(false);
  };

  async function GetUserData() {
    setShowLoading(true);
    let res = await API.get<any>("/api/UIData/GetUserWithUIData");
    setShowLoading(false);
    const claims: string[] = res.data.user?.roles?.flatMap((role: any) => role?.roleClaims?.map((o: string) => o));
    setUserClaimsState(claims);
    setLogedIn(true);
    return res.data;

    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //   if(localStorage.getItem(tokenKey)) {
    //     resolve(Static_User_Claims);
    //   } else reject();
    //     setShowLoading(false);
    //   }, 1000);
    // });
  }

  useEffect(() => {
    GetUserData()
      .catch(() => setLogedIn(false))
      .finally(() =>  {
        setShowLoading(false);
      });
  }, []);

  if (showLoading) return <h1>Loading</h1>;

  // function generateDrawerItems(items: DrawerItem[]): JSX.Element[] {
  //   return items.map((page: DrawerItem) => {
  //     if (page?.childItems?.length) {
  //       return page.to ? (
  //         <li>
  //           <Link className="subPages" to={page.to ?? ""} key={page.name}>
  //             <div>{page.name}</div>
  //             {generateDrawerItems(page.childItems)}
  //           </Link>
  //         </li>
  //       ) : (
  //         <li className="subPages" key={page.name}>
  //           <div>{page.name}</div>
  //           {generateDrawerItems(page.childItems)}
  //         </li>
  //       );
  //     } else {
  //       return page.to ? (
  //         <li>
  //           <Link className="subPages" to={page.to ?? ""} key={page.name}>
  //             {page.name}
  //           </Link>
  //         </li>
  //       ) : (
  //         <li>{page.name}</li>
  //       );
  //     }
  //   });
  // }

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          {logedIn && (
            <>
              <div style={{display: "flex", width: "100%", justifyContent: "end"}} >
                <button onClick={logOuthandler}>loged out</button>
              </div>
            </>
          )}
          <ul className="ul">
          <li onClick={() => navigate("/")}>Home</li>
            {logedIn 
              ? generateDrawerExtenstion(drawerItems, 
                    (page: DrawerItem) => page.to 
                      ? <Link className="subPagesLink" to={page.to ?? ""} key={page.name}>{page.name}</Link> 
                      : page.name ) : (
                        <>
                        <li style={{display: "flex", width: "100%", justifyContent: "end"}} >
                          <button onClick={loginhandler}>loge in</button>
                          <button onClick={() => navigate("reset-password")}>reset password</button>
                        </li>
                      </>
                      )}
          </ul>
        </div>
      </header>
     <div style={{padding: "0 20px"}}>
      <PermissionProvider userClaims={userClaimsState} userActions={actions}>
          <Routes>
            {/* privitae routes by router  */}
            {privateRoutes.map((o: RoutesType) => {
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

            {/* unAuhorized routes  */}
            {unAuthorizedRoutes.map((o: RoutesType) => {
              const Page = o.Component;
              return (
                <Route 
                key={o.to}
                path={o.to}
                element={<UnAuthorizedRoute 
                          isLogedIn={logedIn} 
                          redirectToHome={() => navigate("/")}
                          homePageComponent={<Home />}
                          component={<Page />} 
                        /> }  
                />
            )
            })}

            {/* authorized public routes */}
            {authorizedPublicRoutes.map((o: RoutesType) => {
              const Page = o.Component;
              return (
                <Route 
                key={o.to}
                path={o.to}
                element={<AuthorizedPublicRoute 
                          isLogedIn={logedIn} 
                          unAuthorizedPage={<Login
                            loginhandler={loginhandler}
                            logOuthandler={logOuthandler}
                          />} 
                          component={<Page />} 
                        /> }  
                />
              )
            })}
                      

          <Route 
            path="/" 
            element={<AuthorizedPublicRoute 
                      isLogedIn={logedIn} 
                      unAuthorizedPage={<Login loginhandler={loginhandler} logOuthandler={logOuthandler} />}
                      component={<Home />} 
                    /> }  
          />

          <Route path='*' element={logedIn ? <h1>404 not found or no permission11</h1> : <Login loginhandler={loginhandler} logOuthandler={logOuthandler} />}/>
          
          </Routes>
      </PermissionProvider>
     </div>
    </div>
  );
}

export default App;