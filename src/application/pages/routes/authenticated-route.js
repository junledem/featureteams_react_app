import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useApplicationContext } from "../../containers/application.context";

export default function AuthenticatedRoute({ children, ...rest }) {
  const { pathname, search } = useLocation();
  const { authorization } = useApplicationContext();
  console.log(pathname);
  console.log(search);
  console.log(authorization);
  return (
    <Route { ...rest }>
      { authorization.isAuthUser ? (
        children
      ) : (
        <Redirect to="/login" />
        // <Redirect to={
        //   `/login?redirect=${pathname}${search}`
        // } />
      ) }
    </Route>
  );
}