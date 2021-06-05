/**
 * Importing npm packages.
 */
import React, { useContext, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';

/**
 * Importing npm design components.
 */

/**
 * Importing user defined components.
 */
import AuthPage from '../../pages/auth-page/AuthPage';
import ExplorePage from '../../pages/explore-page/ExplorePage';
import HomePage from '../../pages/home-page/HomePage';
import NovelDashboard from '../../pages/novel-dashboard/NovelDashboard';
import NovelForm from '../../pages/novel-form/NovelForm';
import NovelPage from '../../pages/novel-page/NovelPage';
import PageNotFound from '../../pages/page-not-found/PageNotFound';
import Workspace from '../../pages/workspace/Workspace';
import ChapterForm from '../../pages/chapter-form/ChapterForm';
import ChapterPage from '../../pages/chapter-page/ChapterPage';
import SearchPage from '../../pages/search-page/SearchPage';
import ProfilePage from '../../pages/profile-page/ProfilePage';

/**
 *  Importing user defined modules.
 */
import { AuthContext } from '../../utils/store';
import { AuthAPI } from '../../utils/api';

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */
import type { RouteComponentProps } from 'react-router-dom';

interface IRoute {
  path: string;
  component: React.ComponentType<any>;
  isPrivate?: boolean;
}

interface RouterProps {
  contentRef: React.RefObject<HTMLDivElement>;
}

/**
 * Declaring constants.
 */
const redirect = (props: RouteComponentProps) => <Redirect to={{ pathname: '/login', state: props.location.pathname }} />;
const routes: IRoute[] = [
  { path: '/', component: HomePage },
  { path: '/novel', component: ExplorePage },
  { path: '/profile', component: ProfilePage },
  { path: '/search', component: SearchPage },
  { path: '/workspace', component: Workspace, isPrivate: true },
  { path: '/workspace/new-novel', component: NovelForm, isPrivate: true },
  { path: '/workspace/:nid', component: NovelDashboard, isPrivate: true },
  { path: '/workspace/:nid/new-chapter', component: ChapterForm, isPrivate: true },
  { path: '/edit/:nid', component: NovelForm, isPrivate: true },
  { path: '/edit/:nid/:cid', component: ChapterForm, isPrivate: true },
  { path: '/novel/:nid', component: NovelPage },
  { path: '/novel/:nid/:cid', component: ChapterPage }
];

function constructRoute(route: IRoute, isAuthenticated: boolean) {
  let component = route.component;
  if (route.isPrivate && !isAuthenticated) return <Route exact key={route.path} path={route.path} render={redirect} />;
  return <Route exact key={route.path} path={route.path} component={component} />;
}

function Router(props: RouterProps) {
  const location = useLocation();
  const [auth, setAuth] = useContext(AuthContext);
  const { isLoading, mutate } = useMutation(AuthAPI.verifySession, { onSuccess: setAuth, onError: () => setAuth() });

  useEffect(() => mutate(), []);
  useEffect(() => props.contentRef.current?.scrollTo(0, 0), [location]);

  const routeList = routes.map((route) => constructRoute(route, auth.isAuthenticated));

  return (
    <Switch>
      <Route path='/login' render={({ location }) => (auth.isAuthenticated ? <Redirect to={(location.state as string) || '/workspace'} /> : <AuthPage loading={isLoading} />)} />
      {routeList}
      <Route path='*' component={PageNotFound} />
    </Switch>
  );
}

export default Router;
