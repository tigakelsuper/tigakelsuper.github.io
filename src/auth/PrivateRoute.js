import React from 'react'
import {Redirect,Route} from 'react-router-dom'
import { useAuth } from "./auth";

function PrivateRoute({ component: Component, ...rest }) {
    const { authTokens } = useAuth();
    console.log(authTokens);
    return (
      <Route
        {...rest}
        render={props =>
            authTokens  ? (
            <Component {...props} />
          ) : (
            <Redirect to="/sign-in" />
          )
        }
      />
    );
  }
  
  export default PrivateRoute;
