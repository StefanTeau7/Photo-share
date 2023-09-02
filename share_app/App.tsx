import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Toast from 'react-native-toast-message';
import SignInComponent from './src/components/SignInComponent';
import TabsComponent from './src/components/TabsComponent';
import {UserProvider, useUser} from './src/providers/UserContext';
import {useAuth} from './src/services/useAuth';

const Stack = createNativeStackNavigator();

export function InnerApp() {
  const {signIn} = useAuth();
  const {userInfo} = useUser();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userInfo ? 'Tabs' : 'SignIn'}>
        {userInfo ? (
          <Stack.Screen
            name="Tabs"
            component={TabsComponent}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen name="SignIn" options={{title: 'Sign In'}}>
            {() => <SignInComponent signIn={signIn} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider>
      <InnerApp />
    </UserProvider>
  );
}
