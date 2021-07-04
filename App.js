import React from 'react';
import { View, Text } from 'react-native';

import firebase from 'firebase';
import { firebaseConfig } from './firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';

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
      <View style={{ flex: 1, justifyContent: 'center' }}>
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>You have logged in!</Text>
    </View>
  );
}
