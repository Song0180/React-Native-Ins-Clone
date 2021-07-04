import * as React from 'react';
import { View, Button, TextInput } from 'react-native';
import firebase from 'firebase';

export default function Register() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const onSignUp = async () => {
    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          name,
          email,
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Input your name"
        onChangeText={name => setName(name)}
      />
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
        title="Sign Up"
      />
    </View>
  );
}
