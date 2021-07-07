import * as React from 'react';
import { View, Text, Image, FlatList, Button } from 'react-native';
import firebase from 'firebase';

import { useAuthStore } from '../../../shared/zustand/auth';
import { styles } from './style';

export default function Profile() {
  const { currentUser, posts, fetchUserPosts } = useAuthStore();
  console.log(posts);
  const onLogOut = () => {
    firebase.auth().signOut();
  };

  React.useEffect(() => {
    fetchUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{currentUser.name}</Text>
        <Text>{currentUser.email}</Text>
      </View>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image style={styles.image} source={{ uri: item.downloadUrl }} />
            </View>
          )}
        />
      </View>

      <Button title="Log Out" onPress={onLogOut} />
    </View>
  );
}
