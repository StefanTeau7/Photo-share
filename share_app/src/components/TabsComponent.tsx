import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FavoriteImagesScreen from '../screens/FavoriteImagesScreen';
import UnsplashGridView from '../screens/UnsplashGridView';

const Tab = createBottomTabNavigator();

const UnsplashIcon = () => (
  <Ionicons name={'images-outline'} size={20} color={'#007AFF'} />
);

const FavoriteIcon = () => (
  <Ionicons name={'heart-outline'} size={20} color={'#007AFF'} />
);

const TabsComponent = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="UnsplashGridView"
        component={UnsplashGridView}
        options={{
          title: 'Unsplash Images',
          tabBarIcon: UnsplashIcon,
        }}
      />
      <Tab.Screen
        name="FavoriteImagesScreen"
        component={FavoriteImagesScreen}
        options={{
          title: 'Favorite Images',
          tabBarIcon: FavoriteIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsComponent;
