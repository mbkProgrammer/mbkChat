import actionTypes from '../configs/actionTypes';

const messages = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_MESSAGES_STARTED: {
      return {
        ...state,
        loading: action.loading,
        error: action.error,
        activeUser: action.activeUser,
        messages: action.messages,
        chatId: action.chatId,
      };
    }
    case actionTypes.CHANGE_MESSAGES_SUCCESS: {
      return {
        ...state,
        loading: action.loading,
        error: action.error,
        messages: action.messages.messages,
        activeUser: action.activeUser,
        chatId: action.chatId,
      };
    }
    case actionTypes.CHANGE_MESSAGES_FAILED: {
      return {
        ...state,
        loading: action.loading,
        error: action.error,
        errorMes: action.errorMes,
      };
    }
    default:
      return state;
  }
};

export default messages;
