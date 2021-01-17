// System
import { useState } from 'react';
import { getLocalStorageItem } from '../helpers/localStorage';

function useLoginStatus() {
  const [isLoggedIn] = useState(() =>
    getLocalStorageItem('token') ? true : false
  );
  return isLoggedIn;
}

export default useLoginStatus;
