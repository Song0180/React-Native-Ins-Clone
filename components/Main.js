import * as React from 'react';
// import firebase from 'firebase';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAuthStore } from '../shared/zustand/auth';
import FeedScreen from '../components/main/Feed';

import ProfileScreen from '../components/main/Profile';
import { styles } from './style';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return null;
};

export default function Main() {
  const { currentUser, fetchUser } = useAuthStore();

  React.useEffect(() => {
    fetchUser();
  }, []);

  //  <Button title="Log Out" onPress={onLogOut} />;
  // const onLogOut = () => {
  //   firebase.auth().signOut();
  // };

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
