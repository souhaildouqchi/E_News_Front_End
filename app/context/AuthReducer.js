export const authReducer = (state, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...state,
        token: action.token,
        isLoading: false,
      };

    case "SIGN_IN": {
      return {
        errorMessage: "",
        token: action.payload,
      };
    }

    case "SIGN_OUT": {
      return {
        errorMessage: "",
        token: null,
      };
    }
    case "add_error": {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    case "clear_error_message": {
      return {
        ...state,
        errorMessage: "",
      };
    }

    default:
      return state;
  }
};
