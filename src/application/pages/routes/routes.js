import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import AuthenticatedRoute from './authenticated-route';
import ConfigurationComponent from '../components/configuration/configuration.component';
import HomeComponent from '../components/home/home.component';
import LoginComponent from '../components/login/login.component';
import { RouteConst } from '../../common/constants/route.const';

export default function Routes() {
  return (
    <Switch>
      <Route exact path={ RouteConst.DEFAULT } component={ HomeComponent } />

      <Route exact path={ RouteConst.LOGIN } component={ LoginComponent } />
     
      {/* <AuthenticatedRoute exact path={ RouteConst.CONFIGURATION } component={ ConfigurationComponent } /> */}
      <Route exact path={ RouteConst.CONFIGURATION } component={ ConfigurationComponent } />
  
    </Switch>
  );
}