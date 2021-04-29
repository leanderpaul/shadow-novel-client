/**
 * Importing npm packages.
 */
import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/**
 * Importing npm design components.
 */

/**
 * Importing user defined components.
 */
import AuthPage from '../../pages/auth-page/AuthPage';
import ExplorePage from '../../pages/explore-page/ExplorePage';
import HomePage from '../../pages/home-page/HomePage';
import NovelForm from '../../pages/novel-form/NovelForm';
import NovelPage from '../../pages/novel-page/NovelPage';
import PageNotFound from '../../pages/page-not-found/PageNotFound';
import Workspace from '../../pages/workspace/Workspace';

/**
 *  Importing user defined modules.
 */
import { AuthContext } from '../../utils/store';

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */
interface IRoute {
  path: string;
  component: React.ComponentType<any>;
}

/**
 * Declaring constants.
 */
const publicRoutes: IRoute[] = [
  { path: '/', component: HomePage },
  { path: '/explore', component: ExplorePage },
  { path: '/novel/:nid', component: NovelPage }
];
const privateRoutes: IRoute[] = [
  { path: '/novel/new-novel', component: NovelForm },
  { path: '/workspace', component: Workspace }
];

function constructRoute(route: IRoute, isAuthenticated?: boolean) {
  let component = route.component;
  // if (isAuthenticated === undefined) return <Route exact key={route.path} path={route.path} component={route.component} />;
  // if (isAuthenticated) return <Route exact key={route.path} path={route.path} component={route.component} />;
  if (isAuthenticated === false) component = () => <Redirect to={{ pathname: '/login', state: { from: route.path } }} />;
  return <Route exact key={route.path} path={route.path} component={component} />;
}

function Router() {
  const [auth] = useContext(AuthContext);

  const publicRouteList = publicRoutes.map((route) => constructRoute(route));
  const privateRouteList = privateRoutes.map((route) => constructRoute(route, auth.isAuthenticated));

  return (
    <Switch>
      <Route path='/login' component={AuthPage} />
      {publicRouteList}
      {privateRouteList}
      <Route path='*' component={PageNotFound} />
    </Switch>
  );
}

export default Router;
