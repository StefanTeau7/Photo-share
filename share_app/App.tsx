import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from 'firebase/auth';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {auth} from './firebaseConfig';
import FavoriteImagesScreen from './src/screens/favorite_images_screen';
import UnsplashGridView from './src/screens/unsplash_grid_view';

GoogleSignin.configure({
  webClientId:
    '364512192022-9m3946qr5hrqtruo7rrcla816br4rnsm.apps.googleusercontent.com',
  iosClientId:
    '364512192022-bf4pdbbi94f38o7kp1vhok8jbepnnp3d.apps.googleusercontent.com',
  offlineAccess: true,
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="UnsplashGridView"
        component={UnsplashGridView}
        options={{title: 'Unsplash Images'}}
      />
      <Tab.Screen
        name="FavoriteImagesScreen"
        component={FavoriteImagesScreen}
        options={{title: 'Favorite Images'}}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState<any | null>(null);
  let [userInfo, setUserInfo] = useState<any | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      console.log('USER IS STILL LOGGED IN: ', user);
      if (user) {
        setUserInfo(user.uid);
        setUser(user);
      }
    });
  }, [user]);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      userInfo = idToken;
      console.log(userInfo);
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, googleCredential);
      if (result) {
        setUserInfo(userInfo);
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userInfo ? 'Tabs' : 'SignIn'}>
        {userInfo ? (
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen name="SignIn" options={{title: 'Sign In'}}>
            {(_props: any) => (
              <View style={styles.center}>
                <GoogleSigninButton
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={() => signIn()}
                />
              </View>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
