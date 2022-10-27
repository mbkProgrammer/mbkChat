import { onAuthStateChanged } from 'firebase/auth';
import App from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { UPDATE_USER_ACTION } from '../actions';
import store from '../configs/store';
import { auth } from '../firebase';
import '../styles/globals.css';

const AppWrapper = ({ Component, pageProps }) => (
  <Provider store={store}>
    <MyApp Component={Component} pageProps={pageProps} />
  </Provider>
);

AppWrapper.getInitialProps = async (appContext) => {
  appContext.ctx.reduxStore = store;
  const pageProps = await App.getInitialProps(appContext);
  return {
    ...pageProps,
  };
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('auth.currenUser :>> ', auth.currentUser);
    onAuthStateChanged(auth, async (user) => {
      auth.currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
        console.log('user', idToken);
        // Send token to your backend via HTTPS
        // ...
      }).catch((error) => {
        // Handle error
      });
      // if (user !== null) {
      //   dispatch(UPDATE_USER_ACTION());
      //   router.push('/');
      // } else {
      //   router.push('/signUp');
      // }
    });
  }, []);
  return (
    <Component {...pageProps} />
  );
}

// MyApp.getInitialProps = async (appContext) => {
//   console.log('reduxStore :>> ', appContext.ctx.reduxStore);
//   const pageProps = await App.getInitialProps(appContext);
//   return {
//     ...pageProps,
//   };
// };

export default AppWrapper;
