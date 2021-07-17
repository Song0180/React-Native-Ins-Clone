import * as React from 'react';
import { FlatList, View, Text, Image } from 'react-native';

import { useUserInteractStore } from '../../../shared/zustand/userInteractions';
import { styles } from './style';

export default function Feed({ navigation }) {
  const { users, following, usersFollowingLoaded } = useUserInteractStore();

  const [feedPosts, setFeedPosts] = React.useState([]);

  React.useEffect(() => {
    let feedPosts = [];
    if (usersFollowingLoaded === following.length) {
      for (let i = 0; i < following.length; i++) {
        const user = users.find(user => user.uid === following[i]);
        if (user !== undefined) {
          feedPosts = [...feedPosts, ...user.posts];
        }
      }
      feedPosts.sort(function (x, y) {
        return x.creation - y.creation;
      });
      setFeedPosts(feedPosts);
    }
  }, [usersFollowingLoaded]);

  return (
    <View style={styles.container}>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={feedPosts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Text>{item.user.name}</Text>
              <Image style={styles.image} source={{ uri: item.downloadUrl }} />
              <Text
                onPress={() => {
                  navigation.navigate('Comment', {
                    postId: item.id,
                    uid: item.user.uid,
                  });
                }}
              >
                View Comments
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
