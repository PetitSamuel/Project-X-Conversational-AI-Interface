import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout} from './layouts';

import {
  Auth as AuthV,
  Overview as OverviewV,    
  Assistants as AssistantsV,
  Analytics as AnalyticsV,
  Tools as ToolV,
  Dialog as DialogsV,
  
} from './components';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/auth"
      />
      <Route path="/auth">
            <AuthV/>
        </Route>
        
      <RouteWithLayout
        component={OverviewV}
        exact
        layout={MainLayout}
        path="/overview"
      />
      <RouteWithLayout
        component={OverviewV}
        exact
        layout={MainLayout}
        path="/overview"
      />
      <RouteWithLayout
        component={AssistantsV}
        exact
        layout={MainLayout}
        path="/assistants"
      />
      <RouteWithLayout
        component={DialogsV}
        exact
        layout={MainLayout}
        path="/dialogs"
      />
      <RouteWithLayout
        component={ToolV}
        exact
        layout={MainLayout}
        path="/tools"
      />
      <RouteWithLayout
        component={AnalyticsV}
        exact
        layout={MainLayout}
        path="/analytics"
      />
    </Switch>
  );
};

export default Routes;