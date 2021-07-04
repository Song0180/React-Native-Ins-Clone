import * as React from 'react';
import firebase from 'firebase';
import { View, Text, Button } from 'react-native';
import { useAuthStore } from '../shared/zustand/auth';

export default function Main() {
  const { currentUser, fetchUser } = useAuthStore();
  React.useEffect(() => {
    fetchUser();
  }, []);

  const onLogOut = () => {
    firebase.auth().signOut();
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        Congrats! {currentUser ? currentUser.name : 'You'} have logged in!
      </Text>
      <Button title="Log Out" onPress={onLogOut} />
    </View>
  );
}
