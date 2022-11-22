/* eslint-disable no-param-reassign */
import App from 'next/app';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { auth } from '../firebase';
import store from '../configs/store';
import '../styles/globals.css';
import { UPDATE_USER_ACTION } from '../actions/auth';

const AppWrapper = ({ Component, pageProps }) => (
  <Provider store={store}>
    <MyApp Component={Component} pageProps={pageProps} />
  </Provider>
);
// AppWrapper.getInitialProps = async (appContext) => {
//   appContext.ctx.reduxStore = store;
//   const pageProps = await App.getInitialProps(appContext);
//   return {
//     ...pageProps,
//   };
// };

function MyApp({ Component, pageProps }) {
  const cookies = new Cookies();
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user && user.uid !== '') {
        dispatch(UPDATE_USER_ACTION());
      }
    });
  }, []);

  useEffect(() => {
    auth.onIdTokenChanged(async (user) => {
      if (!user) {
        cookies.set('token', '', { path: '/' });
      } else {
        const token = await user.getIdToken();
        cookies.set('token', token, { path: '/' });
      }
    });
  }, [auth]);
  return (
    <Component {...pageProps} />
  );
}
export default AppWrapper;
