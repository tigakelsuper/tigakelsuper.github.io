import React from 'react';
import PropTypes from 'prop-types';
import {Redirect,Route} from 'react-router-dom'
import { useAuth } from "./../../auth/auth";

const PrivateRouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;
  const { authTokens } = useAuth();

  return (
    <Route
      {...rest}
      render={matchProps => authTokens ? (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      ) : (
        <Redirect to="/sign-in" />
      )}
    />
  );
};

PrivateRouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default PrivateRouteWithLayout;
