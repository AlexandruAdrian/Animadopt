// System
import React, { createContext, useState } from 'react';
// Utils
import { getLocalStorageItem } from '../helpers/localStorage';

export const AuthContext = createContext({});

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!getLocalStorageItem('token')
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
