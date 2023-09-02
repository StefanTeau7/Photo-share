// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA3zpBlJLjlWbiXUVqiVwpRKv0s93T2GO4',
  authDomain: 'photo-share-f0ce5.firebaseapp.com',
  projectId: 'photo-share-f0ce5',
  storageBucket: 'photo-share-f0ce5.appspot.com',
  messagingSenderId: '460549466914',
  appId: '1:460549466914:web:31edd0c40a56cd2f74137b',
  measurementId: 'G-HSJTDZPMS1',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
