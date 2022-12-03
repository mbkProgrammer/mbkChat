import {
  arrayUnion, doc, onSnapshot, orderBy, serverTimestamp, Timestamp, updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import actionTypes from '../configs/actionTypes';
import { auth, db, storage } from '../firebase';

const CHANGE_MESSAGE_ACTION = ({ userUID }) => async (dispatch) => {
  dispatch({
    type: actionTypes.CHANGE_MESSAGES_STARTED,
    error: false,
    loading: true,
    activeUser: '',
    errorMes: '',
    chatId: '',
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
        messages: doc.exists() && doc.data(),
        chatId: combinedId,
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

const SEND_MESSAGE_ACTION = ({
  text, img, chatId, activeUser,
}) => async (dispatch) => {
  dispatch({
    type: actionTypes.SEND_MESSAGES_STARTED,
    loading: true,
    error: false,
  });
  try {
    const { currentUser } = auth;
    if (img) {
      // send message with img
      const metadata = { contentType: 'image/jpeg' };
      const storageRef = ref(storage, `images/${chatId}/${uuid()}/${img.name}`);
      const uploadTask = uploadBytesResumable(storageRef, img, metadata);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case 'paused':
              break;
            case 'running':
              break;
            default:
          }
        },
        (error) => {
          console.log('error', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        },
      );
    } else {
      // send message without img
      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [`${chatId}.lastMessage`]: { text },
      [`${chatId}.date`]: serverTimestamp(),
    });
    await updateDoc(doc(db, 'userChats', activeUser), {
      [`${chatId}.lastMessage`]: { text },
      [`${chatId}.date`]: serverTimestamp(),
    });
    dispatch({
      type: actionTypes.SEND_MESSAGES_SUCCESS,
      loading: false,
      error: false,
    });
  } catch (e) {
    console.log('e', e);
    dispatch({
      type: actionTypes.SEND_MESSAGES_FAILED,
      loading: false,
      error: true,
    });
  }
};

export { CHANGE_MESSAGE_ACTION, SEND_MESSAGE_ACTION };
