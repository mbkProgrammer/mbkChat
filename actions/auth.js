import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import actionTypes from '../configs/actionTypes';
import { auth, db } from '../firebase';

const CREATE_USER_ACTION = ({
  email, password, displayName, photoURL,
}) => async (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_USER_STARTED,
    loading: true,
    logged: true,
    signUpError: false,
  });

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
    await setDoc(doc(db, 'users', response.user.uid), {
      uid: response.user.uid,
      displayName,
      email,
      photoURL,
    });
    await setDoc(doc(db, 'userChats', response.user.uid), {});
    dispatch({
      type: actionTypes.CREATE_USER_SUCCESS,
      loading: false,
      logged: true,
      response: auth.currentUser,
      signUpError: false,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_USER_FAILED,
      loading: false,
      logged: false,
      signUpError: true,
      errorMessage: error,
    });
  }
};

const SIGN_IN_USER_ACTION = ({ email, password }) => async (dispatch) => {
  dispatch({
    type: actionTypes.SIGN_IN_USER_STARTED,
    loading: true,
    logged: true,
    signInError: false,
  });
  try {
    await signInWithEmailAndPassword(auth, email, password);
    dispatch({
      type: actionTypes.SIGN_IN_USER_SUCCESS,
      loading: false,
      logged: true,
      response: auth.currentUser,
      signInError: false,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.SIGN_IN_USER_FAILED,
      loading: false,
      logged: false,
      signInError: true,
      errorMessage: error,
    });
  }
};
export { CREATE_USER_ACTION, SIGN_IN_USER_ACTION };
