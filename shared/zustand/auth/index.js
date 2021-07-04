import create from 'zustand';
import firebase from 'firebase';
import { initialState, USER_STATE_CHANGE } from './constant';

export const useAuthStore = create(set => ({
  ...initialState,
  fetchUser: async () => {
    const snapShot = await firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get();
    if (snapShot.exists) {
      console.log(snapShot.data());
      set({ type: USER_STATE_CHANGE, currentUser: snapShot.data() });
    } else {
      console.log('Does not exist');
    }
  },
}));
