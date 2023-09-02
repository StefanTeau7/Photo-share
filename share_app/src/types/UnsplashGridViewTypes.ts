import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  FavoriteImagesScreen: undefined;
  SignIn: undefined;
  UnsplashGridView: undefined;
};
export type UnsplashGridViewNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UnsplashGridView'
>;

export type UnsplashGridViewRouteProp = RouteProp<
  RootStackParamList,
  'UnsplashGridView'
>;

export type UnsplashGridViewProps = StackScreenProps<
  RootStackParamList,
  'UnsplashGridView'
> & {
  onSignOut: () => void;
};
