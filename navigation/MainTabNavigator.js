import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import PhotosScreen from '../screens/PhotosScreen';
import PostScreen from '../screens/PostScreen';
import SubmitScreen from '../screens/SubmitScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const PhotosStack = createStackNavigator(
  {
    Home: PhotosScreen,
  },
  config
);

PhotosStack.navigationOptions = {
  tabBarLabel: 'Photos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? 'ios-home' : 'md-home'
      }
    />
  ),
};

PhotosStack.path = '';

const PostStack = createStackNavigator(
  {
    Post: PostScreen,
    Submit: SubmitScreen
  },
  config
);

PostStack.navigationOptions = {
  tabBarLabel: 'Take Photo',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'} />
  ),
};

PostStack.path = '';

const tabNavigator = createBottomTabNavigator({
  PhotosStack,
  PostStack
});

tabNavigator.path = '';

export default tabNavigator;
