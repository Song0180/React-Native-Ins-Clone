import * as React from 'react';
import { View, TextInput, Image, Button } from 'react-native';
import firebase from 'firebase';
require('firebase/firestore');
require('firebase/firebase-storage');

import { styles } from './style';

export default function Save(props) {
  const [caption, setCaption] = React.useState('');

  const savePostData = async downloadUrl => {
    const result = await firebase
      .firestore()
      .collection('posts')
      .doc(firebase.auth().currentUser.uid)
      .collection('userPosts')
      .add({
        downloadUrl,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      });
    props.navigation.popToTop();
  };

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    const response = await fetch(uri);
    const blob = await response.blob();
    const task = firebase.storage().ref().child(childPath).put(blob);
    const taskProgress = snapshot => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = async () => {
      const imageUrl = await task.snapshot.ref.getDownloadURL();
      savePostData(imageUrl);
      console.log(imageUrl);
    };

    const taskError = snapshot => {
      console.log(snapshot);
    };

    task.on('state_changed', taskProgress, taskError, taskCompleted);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput
        placeholder="Write a Caption"
        onChangeText={caption => setCaption(caption)}
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}
