import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router";

import { DrawerItem, RoutesType } from "./routing/route.types";
import PrivateRoute from "./routes/PrivateRoutes";
import Login from "./pages/LogIn";
import { getDrawerRoutes, userClaims } from "./routing/routes";

import "./App.css";

const tokenKey = "userToken";

function App() {
  const [routes, setRoutes] = useState<RoutesType[]>([]);
  const [drawer, setDrawer] = useState<DrawerItem[]>([]);

  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [logedIn, setLogedIn] = useState<boolean>(false);

  const loginhandler = () => {
    localStorage.setItem(tokenKey, "tes_user_token");
    setLogedIn(true);
  };
  const logOuthandler = () => {
    localStorage.removeItem(tokenKey);
    setLogedIn(false);
  };

  async function GetUserData(): Promise<boolean> {
    setShowLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
        setShowLoading(false);
      }, 1000);
    });
  }

  useEffect(() => {
    GetUserData()
      .then(() => {
        const { routes, drawer } = getDrawerRoutes(userClaims);
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
          {logedIn && <div onClick={logOuthandler}>Log out</div>}
          <ul className="ul">
            {logedIn &&
              drawer.map((module: DrawerItem) => {
                if (module?.childItems?.length) {
                  return (
                    <li className="module-container">
                      <div>{module.name}</div>
                      {generateDrawerItems(module.childItems)}
                    </li>
                  );
                } else
                  return module.to ? (
                    <li>
                      <Link
                        className="subPages"
                        to={module.to ?? ""}
                        key={module.name}
                      >
                        {module.name}
                      </Link>
                    </li>
                  ) : (
                    <li>{module.name}</li>
                  );
              })}
          </ul>
        </div>
      </header>
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
    </div>
  );
}

export default App;
