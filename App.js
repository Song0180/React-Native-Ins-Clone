import React from 'react';
import { View, Text } from 'react-native';

import firebase from 'firebase';
import { firebaseConfig } from './firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';
import PostScreen from './components/Screens/Post';
import SaveScreen from './components/Screens/Save';
import CommentScreen from './components/Screens/Comment';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        setIsLoggedIn(false);
        setIsLoaded(true);
      } else {
        setIsLoggedIn(true);
        setIsLoaded(true);
      }
    });
  });

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading</Text>
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="Save" component={SaveScreen} />
        <Stack.Screen name="Comment" component={CommentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
