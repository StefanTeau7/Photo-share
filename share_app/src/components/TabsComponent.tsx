import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import FavoriteImagesScreen from '../screens/FavoriteImagesScreen';
import UnsplashGridView from '../screens/UnsplashGridView';

const Tab = createBottomTabNavigator();

const TabsComponent = () => {
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

export default TabsComponent;
