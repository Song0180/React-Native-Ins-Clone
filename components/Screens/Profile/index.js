import * as React from 'react';
import { View, Text, Image, FlatList, Button } from 'react-native';
import firebase from 'firebase';
require('firebase/firestore');

import { useAuthStore } from '../../../shared/zustand/auth';
import { useUserInteractStore } from '../../../shared/zustand/userInteractions';
import { styles } from './style';

export default function Profile(props) {
  const { currentUser, fetchUser } = useAuthStore();
  const { posts, following, fetchUserPosts, setTargetUserFollowing } =
    useUserInteractStore();

  const onLogOut = () => {
    firebase.auth().signOut();
  };

  React.useEffect(() => {
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      fetchUser(firebase.auth().currentUser.uid);
      fetchUserPosts(firebase.auth().currentUser.uid);
    } else {
      fetchUser(props.route.params.uid);
      fetchUserPosts(props.route.params.uid);
    }
  }, [props.route.params.uid]);

  const onFollow = () => {
    setTargetUserFollowing(props.route.params.uid, true);
  };
  const onUnFollow = () => {
    setTargetUserFollowing(props.route.params.uid, false);
  };

  if (currentUser === null) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{currentUser.name}</Text>
        <Text>{currentUser.email}</Text>
        {props.route.params.uid !== firebase.auth().currentUser.uid && (
          <View>
            {following.includes(props.route.params.uid) ? (
              <Button
                title="Following"
                onPress={() => {
                  onUnFollow();
                }}
              />
            ) : (
              <Button
                title="Follow"
                onPress={() => {
                  onFollow();
                }}
              />
            )}
          </View>
        )}
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
      {props.route.params.uid === firebase.auth().currentUser.uid && (
        <Button title="Log Out" onPress={onLogOut} />
      )}
    </View>
  );
}
