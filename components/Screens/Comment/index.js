import * as React from 'react';
import { View, Text, FlatList, Button, TextInput } from 'react-native';

import { useUserInteractStore } from '../../../shared/zustand/userInteractions';

export default function Comment(props) {
  const [comments, setComments] = React.useState([]);
  const [postId, setPostId] = React.useState('');
  const [text, setText] = React.useState('');

  const {
    users,
    fetchUsersData,
    currentPostComments,
    fetchPostComments,
    sendPostComment,
  } = useUserInteractStore();

  React.useEffect(() => {
    if (props.route.params.postId !== postId) {
      fetchPostComments(props.route.params.uid, props.route.params.postId);
      setPostId(props.route.params.postId);
    }
  }, [props.route.params.postId, props.route.params.uid]);

  React.useEffect(() => {
    currentPostComments.forEach(comment => {
      const user = users.find(user => user.uid === comment.creator);
      if (!user) {
        fetchUsersData(comment.creator);
      } else {
        comment.user = user;
      }
    });

    setComments(currentPostComments);
  }, [users, currentPostComments]);

  const onCommentSend = React.useCallback(() => {
    if (text.length > 0) {
      sendPostComment(props.route.params.uid, props.route.params.postId, text);
      fetchPostComments(props.route.params.uid);
    }
  }, [props.route.params.uid, props.route.params.postId, text]);

  return (
    <View>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={comments}
        renderItem={({ item }) => (
          <View>
            {/* {console.log('what is here: ', item)} */}
            {item.user && <Text>{item.user.name}</Text>}
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <View>
        <TextInput
          placeholder="Add comment..."
          onChangeText={text => setText(text)}
        />
        <Button title="Send" onPress={() => onCommentSend()} />
      </View>
    </View>
  );
}
