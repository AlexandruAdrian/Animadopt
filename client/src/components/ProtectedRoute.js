// System
import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
// Utils
import useLoginStatus from '../hooks/useLoginStatus';
import { useHistory } from 'react-router';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useLoginStatus();
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/login');
    }
  }, [isLoggedIn, history]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
export default ProtectedRoute;
