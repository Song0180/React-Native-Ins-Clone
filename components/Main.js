import * as React from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAuthStore } from '../shared/zustand/auth';
import { useUserInteractStore } from '../shared/zustand/userInteractions';
import FeedScreen from './Screens/Feed';
import SearchScreen from './Screens/Search';
import ProfileScreen from './Screens/Profile';
import { styles } from './style';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return null;
};

export default function Main() {
  const { fetchUser } = useAuthStore();
  const {
    following,
    fetchUsersData,
    fetchUserFollowing,
    fetchUsersFollowingPosts,
  } = useUserInteractStore();

  React.useEffect(() => {
    fetchUser(firebase.auth().currentUser.uid);
    fetchUserFollowing(firebase.auth().currentUser.uid);
  }, []);

  React.useEffect(() => {
    for (let i = 0; i < following.length; i++) {
      fetchUsersData(following[i]);
      fetchUsersFollowingPosts(following[i]);
    }
  }, [following]);

  return (
    <View style={styles.container}>
      <Tab.Navigator initialRouteName="Feed" labeled={false}>
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: ({ color, size = 26 }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size = 26 }) => (
              <MaterialCommunityIcons
                name="magnify"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="PostContainer"
          component={EmptyScreen}
          listeners={({ navigation }) => ({
            tabPress: e => {
              e.preventDefault();
              navigation.navigate('Post');
            },
          })}
          options={{
            tabBarIcon: ({ color, size = 26 }) => (
              <MaterialCommunityIcons
                name="plus-box"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          listeners={({ navigation }) => ({
            tabPress: e => {
              e.preventDefault();
              navigation.navigate('Profile', {
                uid: firebase.auth().currentUser.uid,
              });
            },
          })}
          options={{
            tabBarIcon: ({ color, size = 26 }) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
