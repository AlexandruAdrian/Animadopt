// System
import { useState, useEffect } from 'react';
import { getLocalStorageItem } from '../helpers/localStorage';

function useLoginStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getLocalStorageItem('token');
    console.log(token);

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return isLoggedIn;
}

export default useLoginStatus;
