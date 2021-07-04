import * as React from 'react';
import { View, Button, TextInput } from 'react-native';
import firebase from 'firebase';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSignUp = async () => {
    try {
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Input your email"
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        placeholder="Input your password"
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
      />
      <Button
        onPress={() => {
          onSignUp();
        }}
        title="Log In"
      />
    </View>
  );
}
