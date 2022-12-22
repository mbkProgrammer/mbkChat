/* eslint-disable no-param-reassign */
import App from 'next/app';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import {
  doc, onSnapshot, serverTimestamp, updateDoc,
} from 'firebase/firestore';
import { onDisconnect, ref } from 'firebase/database';
import { auth, db } from '../firebase';
import store from '../configs/store';
import '../styles/globals.css';
import { UPDATE_USER_ACTION } from '../actions/auth';
import { GET_CHAT_ACTION } from '../actions';

const AppWrapper = ({ Component, pageProps }) => (
  <Provider store={store}>
    <MyApp Component={Component} pageProps={pageProps} />
  </Provider>
);

function MyApp({ Component, pageProps }) {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const isOfflineForDatabase = {
    state: 'offline',
    last_changed: serverTimestamp(),
  };

  const isOnlineForDatabase = {
    state: 'online',
    last_changed: serverTimestamp(),
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user && user.uid !== '') {
        dispatch(UPDATE_USER_ACTION());
      }
    });
  }, []);

  useEffect(() => {
    auth.onIdTokenChanged(async (user) => {
      if (user && user.uid) {
        const token = await user.getIdToken();
        cookies.set('token', token, { path: '/' });
      } else {
        cookies.set('token', '', { path: '/' });
      }
    });
  }, [auth]);
  return (
    <Component {...pageProps} />
  );
}
export default AppWrapper;
