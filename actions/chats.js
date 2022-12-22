import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import actionTypes from '../configs/actionTypes';
import { auth, db } from '../firebase';

const ADD_CHAT_ACTION = ({ email, setOpenAddChat }) => async (dispatch) => {
  dispatch({
    type: actionTypes.ADD_CHAT_STARTED,
    loading: true,
    error: false,
    errorMes: '',
  });
  try {
    const { currentUser } = auth;
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    let user;
    querySnapshot.forEach((doc) => {
      user = doc.data();
    });

    const combinedId = currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;

    const res = await getDoc(doc(db, 'chats', combinedId));
    const resExist = res.exists();

    if (!resExist) {
      // create a chat in chat collection
      await setDoc(doc(db, 'chats', combinedId), { messages: [] });

      // create user chats
      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [`${combinedId}.userUid`]: user.uid,
        [`${combinedId}.date`]: serverTimestamp(),
      });
      await updateDoc(doc(db, 'userChats', user.uid), {
        [`${combinedId}.userUid`]: currentUser.uid,
        [`${combinedId}.date`]: serverTimestamp(),
      });
      setOpenAddChat(false);
      dispatch({
        type: actionTypes.ADD_CHAT_SUCCESS,
        loading: false,
        error: false,
      });
    } else {
      dispatch({
        type: actionTypes.ADD_CHAT_FAILED,
        loading: false,
        error: true,
        errorMes: 'This user exists in your chat!',
      });
    }
  } catch (e) {
    dispatch({
      type: actionTypes.ADD_CHAT_FAILED,
      loading: false,
      error: true,
      errorMes: 'user not found!',
    });
  }
};

const GET_CHAT_ACTION = () => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_CHAT_STARTED,
    loading: true,
    error: false,
  });

  try {
    const { currentUser } = auth;
    if (currentUser) {
      onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        const data = doc.exists()
          && Object.entries(doc.data()).sort(
            (a, b) => b[1].date && (b[1].date - a[1].date),
          );
        dispatch({
          type: actionTypes.GET_CHAT_SUCCESS,
          loading: false,
          response: data,
          error: false,
        });
      });
    }
  } catch (e) {
    console.log('e :>> ', e);
    dispatch({
      type: actionTypes.GET_CHAT_FAILED,
      loading: false,
      error: true,
    });
  }
};

export { ADD_CHAT_ACTION, GET_CHAT_ACTION };
