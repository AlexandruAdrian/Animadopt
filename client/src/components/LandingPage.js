import React from 'react';
import auth from '../utils/auth';

const LandingPage = (props) => {
  return (
    <div>
      <h1>Landing page</h1>
      <button
        onClick={() => {
          auth.login(() => {
            props.history.push('/app');
          });
        }}
      >
        Login
      </button>
    </div>
  );
};

export default LandingPage;
