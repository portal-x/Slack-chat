import React, { useContext, useState } from 'react';

const UserContext = React.createContext();
export const UseUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const prewUserData = localStorage.getItem('user');
  const prewUser = JSON.parse(prewUserData)?.username;

  const [user, setUser] = useState(prewUser || null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
