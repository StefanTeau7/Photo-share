import {onAuthStateChanged} from 'firebase/auth';
import React, {createContext, useState, useContext, useEffect} from 'react';
import {auth} from '../../firebaseConfig';
import {User} from 'firebase/auth';

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextType {
  userInfo: User | null;
  setUserInfo: React.Dispatch<React.SetStateAction<any | null>>;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    // Set up the listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in.
        setUserInfo(user);
      } else {
        // User is signed out.
        setUserInfo(null);
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

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
