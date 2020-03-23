import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout} from './layouts';

import {
  Auth as AuthV,
  Overview as OverviewV,    
  Assistants as AssistantsV,
  Upload as UploadV,
  Intents as IntentsV,
  Analytics as AnalyticsV,
  Entities as EntitiesV,
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
        component={UploadV}
        exact
        layout={MainLayout}
        path="/upload"
      />
      <RouteWithLayout
        component={IntentsV}
        exact
        layout={MainLayout}
        path="/intents"
      />
      <RouteWithLayout
        component={DialogsV}
        exact
        layout={MainLayout}
        path="/dialogs"
      />
      <RouteWithLayout
        component={EntitiesV}
        exact
        layout={MainLayout}
        path="/entities"
      />
      <RouteWithLayout
        component={AssistantsV}
        exact
        layout={MainLayout}
        path="/assistants"
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