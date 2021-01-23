// System
import { useState, useEffect } from 'react';
import { getLocalStorageItem } from '../helpers/localStorage';
import { useHistory, useRouteMatch } from 'react-router';

function useLoginStatus() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!getLocalStorageItem('token')
  );

  useEffect(() => {
    const isLogged = !!getLocalStorageItem('token');
    setIsLoggedIn(isLogged);
  }, [url]);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/login');
    }
  }, [isLoggedIn, history]);

  return isLoggedIn;
}

export default useLoginStatus;
