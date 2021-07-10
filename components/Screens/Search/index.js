import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
require('firebase/firestore');

export default function Search({ navigation }) {
  const [users, setUsers] = React.useState([]);

  const fetchUsers = async searchStr => {
    const snapShot = await firebase
      .firestore()
      .collection('users')
      .where('name', '>=', searchStr)
      .get();
    let users = snapShot.docs.map(doc => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });
    setUsers(users);
  };

  return (
    <View>
      <TextInput
        placeholder="Type Something Here"
        onChangeText={searchStr => fetchUsers(searchStr)}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile', { uid: item.id });
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
