import * as React from 'react';
import { View, Text } from 'react-native';
import { useAuthStore } from '../shared/zustand/auth';

export default function Main() {
  const { currentUser, fetchUser } = useAuthStore();
  React.useEffect(() => {
    fetchUser();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        Congrats! {currentUser ? currentUser.name : 'You'} have logged in!
      </Text>
    </View>
  );
}
