import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router";

import { DrawerItem, RoutesType } from "./routing/route.types";
import PrivateRoute from "./wrappers/PrivateRoutes";
import Login from "./pages/LogIn";
import { getDrawerRoutes, userClaims as constUserClaims } from "./routing/routing";
import  { PermissionsContext } from "./hooks/usePermission.hook";

import "./App.css";
import { allModule } from "./routes";

const tokenKey = "userToken";


function generateDrawerExtenstion(items: DrawerItem[], callBack: any = (page: DrawerItem) => {}) {
  return items.map((page: DrawerItem) => {
    if (page?.childItems?.length) {
      return <li className="subPages">
              {callBack(page)}
              {generateDrawerExtenstion(page.childItems, callBack)}
            </li>
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
        resolve(constUserClaims);
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
              && generateDrawerExtenstion(drawer, 
                    (page: DrawerItem) => page.to 
                      ? <Link className="subPagesLink" to={page.to ?? ""} key={page.name}>{page.name}</Link> 
                      : <li className="subPages">{page.name}</li> )}
          </ul>
        </div>
      </header>
     <PermissionsContext.Provider value={{userClaims: userClaimsState}}>
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
     </PermissionsContext.Provider>
    </div>
  );
}

export default App;
