import create from 'zustand';
import firebase from 'firebase';
import {
  initialState,
  USER_STATE_CHANGE,
  USER_POST_STATE_CHANGE,
} from './constant';

export const useAuthStore = create(set => ({
  ...initialState,
  fetchUser: async () => {
    const snapShot = await firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get();
    if (snapShot.exists) {
      set({ type: USER_STATE_CHANGE, currentUser: snapShot.data() });
    } else {
      console.log('Does not exist');
    }
  },
  fetchUserPosts: async () => {
    const snapShot = await firebase
      .firestore()
      .collection('posts')
      .doc(firebase.auth().currentUser.uid)
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

    set({ type: USER_POST_STATE_CHANGE, posts });
  },
}));
