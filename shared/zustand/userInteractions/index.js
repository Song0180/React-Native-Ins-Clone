import create from 'zustand';
import firebase from 'firebase';

import { initialState } from './constant';

export const useUserInteractStore = create((set, get) => ({
  ...initialState,
  fetchUserPosts: async uid => {
    const snapShot = await firebase
      .firestore()
      .collection('posts')
      .doc(uid)
      .collection('userPosts')
      .orderBy('creation', 'asc')
      .get();
    let posts = snapShot.docs.map(doc => {
      const data = doc.data();
      const id = doc.id;
      return {
        id,
        ...data,
      };
    });

    set({ posts });
  },
  setTargetUserFollowing: (targetUid, toFollow) => {
    if (toFollow) {
      firebase
        .firestore()
        .collection('following')
        .doc(firebase.auth().currentUser.uid)
        .collection('userFollowing')
        .doc(targetUid)
        .set({});
    } else {
      firebase
        .firestore()
        .collection('following')
        .doc(firebase.auth().currentUser.uid)
        .collection('userFollowing')
        .doc(targetUid)
        .delete();
    }
  },
  fetchUserFollowing: uid => {
    firebase
      .firestore()
      .collection('following')
      .doc(uid)
      .collection('userFollowing')
      .onSnapshot(snapshot => {
        const following = snapshot.docs.map(doc => {
          return doc.id;
        });
        set({ following });
      });
  },
  fetchUsersData: async targetUid => {
    const { users } = get();
    const found = users.some(user => user.uid === targetUid);
    if (!found) {
      const snapShot = await firebase
        .firestore()
        .collection('users')
        .doc(targetUid)
        .get();
      if (snapShot.exists) {
        const newUser = snapShot.data();
        newUser.uid = snapShot.id;
        set({ users: [...users, newUser] });
      } else {
        console.log('Target user does not exist');
      }
    }
  },
  fetchUsersFollowingPosts: async targetUid => {
    const snapShot = await firebase
      .firestore()
      .collection('posts')
      .doc(targetUid)
      .collection('userPosts')
      .orderBy('creation', 'asc')
      .get();

    const { users, usersLoaded } = get();
    const user = users.find(user => user.uid === targetUid);
    const posts = snapShot.docs.map(doc => {
      const data = doc.data();
      const id = doc.id;
      return {
        id,
        ...data,
        user,
      };
    });

    set({
      usersLoaded: usersLoaded + 1,
      users: users.map(user =>
        user.uid === targetUid ? { ...user, posts: posts } : user
      ),
      targetUid,
    });
  },
}));
