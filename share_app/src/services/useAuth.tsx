import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import {auth} from '../../firebaseConfig';
import {useUser} from '../providers/UserContext';
import ApiService from './API_Service';

GoogleSignin.configure({
  webClientId:
    '364512192022-9m3946qr5hrqtruo7rrcla816br4rnsm.apps.googleusercontent.com',
  iosClientId:
    '364512192022-bf4pdbbi94f38o7kp1vhok8jbepnnp3d.apps.googleusercontent.com',
  offlineAccess: true,
});

export const useAuth = () => {
  const {setUserInfo} = useUser();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredential);
      setUserInfo(idToken);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
      ApiService.cachedCollections = {};
    } catch (error) {
      console.error('Sign-Out Error:', error);
    }
  };

  return {signIn, signOut};
};
