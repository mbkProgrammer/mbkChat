import { doc, onSnapshot } from 'firebase/firestore';
import actionTypes from '../configs/actionTypes';
import { auth, db } from '../firebase';

const CHANGE_MESSAGE_ACTION = ({ userUID }) => async (dispatch) => {
  dispatch({
    type: actionTypes.CHANGE_MESSAGES_STARTED,
    error: false,
    loading: true,
    activeUser: '',
    messages: [],
  });
  try {
    const { currentUser } = auth;
    const combinedId = currentUser.uid > userUID
      ? currentUser.uid + userUID
      : userUID + currentUser.uid;
    onSnapshot(doc(db, 'chats', combinedId), (doc) => {
      dispatch({
        type: actionTypes.CHANGE_MESSAGES_SUCCESS,
        error: false,
        loading: true,
        messages: doc.data(),
        activeUser: userUID,
      });
    });
  } catch (e) {
    dispatch({
      type: actionTypes.CHANGE_MESSAGES_FAILED,
      error: false,
      loading: true,
      errorMes: e,
    });
  }
};

export default CHANGE_MESSAGE_ACTION;
