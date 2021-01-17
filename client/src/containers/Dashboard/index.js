// System
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
// Hooks
import useLoginStatus from '../../hooks/useLoginStatus';

function Dashboard() {
  const history = useHistory();
  const isLoggedIn = useLoginStatus();

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/');
    }
  }, [history]);

  return <div>Dashboard page</div>;
}

export default Dashboard;
