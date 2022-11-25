import actionTypes from "../configs/actionTypes";

const chats = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD_CHAT_STARTED: {
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    }
    case actionTypes.ADD_CHAT_SUCCESS: {
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    }
    case actionTypes.ADD_CHAT_FAILED: {
      return {
        ...state,
        loading: action.loading,
        error: action.error,
        errorMes: action.errorMes,
      };
    }

    case actionTypes.GET_CHAT_STARTED: {
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    }
    case actionTypes.GET_CHAT_SUCCESS: {
      return {
        ...state,
        loading: action.loading,
        response: action.response,
        error: action.error,
      };
    }
    case actionTypes.GET_CHAT_FAILED: {
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    }

    default: return state
  }
};

export default chats;
