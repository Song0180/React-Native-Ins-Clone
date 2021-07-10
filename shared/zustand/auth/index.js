import create from 'zustand';
import firebase from 'firebase';
import { initialState } from './constant';

export const useAuthStore = create(set => ({
  ...initialState,
  fetchUser: async uid => {
    const snapShot = await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get();
    if (snapShot.exists) {
      set({ currentUser: snapShot.data() });
    } else {
      console.log('Does not exist');
    }
  },
}));
