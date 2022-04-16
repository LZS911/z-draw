import { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import routers from './router.config';
import LayoutComponent from '../pages/Layout';
import { GlobalSnackbars } from '../components';

export default function RouterComponent() {
  return (
    <>
      <Router>
        <LayoutComponent>
          <Suspense fallback={null}>
            <Switch>
              {routers.map((menu) => {
                if (menu.component) {
                  return (
                    <Route
                      exact
                      path={menu.path}
                      key={menu.name}
                      component={menu.component}
                    />
                  );
                }
                return null;
              })}
              <Route render={() => <Redirect to="/home" />} />
            </Switch>
          </Suspense>
        </LayoutComponent>
      </Router>
      <GlobalSnackbars />
    </>
  );
}
