/* eslint-disable default-param-last */
import actionTypes from '../configs/actionTypes';

const auth = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_USER_STARTED: {
      return {
        ...state,
        loading: action.loading,
        logged: action.logged,
        signUpError: action.signUpError,
      };
    }
    case actionTypes.CREATE_USER_SUCCESS: {
      return {
        ...state,
        loading: action.loading,
        logged: action.logged,
        signUpError: action.signUpError,
        response: action.response,
      };
    }
    case actionTypes.CREATE_USER_FAILED: {
      return {
        ...state,
        signUpError: action.signUpError,
        loading: action.loading,
        logged: action.logged,
        errorMessage: action.errorMessage,
      };
    }

    case actionTypes.SIGN_IN_USER_STARTED: {
      return {
        ...state,
        loading: action.loading,
        logged: action.logged,
        signInError: action.signInError,
      };
    }
    case actionTypes.SIGN_IN_USER_SUCCESS: {
      return {
        ...state,
        loading: action.loading,
        logged: action.logged,
        signInError: action.signInError,
        response: action.response,
      };
    }
    case actionTypes.SIGN_IN_USER_FAILED: {
      return {
        ...state,
        signInError: action.signInError,
        loading: action.loading,
        logged: action.logged,
        errorMessage: action.errorMessage,
      };
    }

    case actionTypes.UPDATE_USER_STARTED: {
      return {
        ...state,
        loading: action.loading,
        logged: action.logged,
        signInError: action.signInError,
      };
    }
    case actionTypes.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        loading: action.loading,
        logged: action.logged,
        signInError: action.signInError,
        response: action.response,
      };
    }
    case actionTypes.UPDATE_USER_FAILED: {
      return {
        ...state,
        signInError: action.signInError,
        loading: action.loading,
        logged: action.logged,
        errorMessage: action.errorMessage,
      };
    }
    case actionTypes.LOG_OUT_STARTED: {
      return {
        ...state,
        loading: action.loading,
        logged: action.logged,
        signInError: action.signInError,
      };
    }
    case actionTypes.LOG_OUT_SUCCESS: {
      return {
        ...state,
        loading: action.loading,
        logged: action.logged,
        signInError: action.signInError,
        response: action.response,
      };
    }
    case actionTypes.LOG_OUT_FAILED: {
      return {
        ...state,
        signInError: action.signInError,
        loading: action.loading,
        logged: action.logged,
        errorMessage: action.errorMessage,
      };
    }
    default: return state;
  }
};

export default auth;
