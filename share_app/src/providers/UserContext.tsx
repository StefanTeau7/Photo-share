import React, {createContext, useState, useContext} from 'react';

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextType {
  userInfo: any | null;
  setUserInfo: React.Dispatch<React.SetStateAction<any | null>>;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
