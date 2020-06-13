export const SELECT_DEVICE = "SELECT_DEVICE";
export const SET_STATUS_RECOGNITION = "SET_STATUS_RECOGNITION";
export const SET_FACES_RESULT = "SET_FACES_RESULT";
export const AUTH = "AUTH";

export const mainReducer = (state, action) => {
  switch (action.type) {
    case SELECT_DEVICE:
      return { ...state, selectedDevice: action.payload };
    case SET_STATUS_RECOGNITION:
      return { ...state, statusRecognition: action.payload };
    case SET_FACES_RESULT:
      return { ...state, faceResult: action.payload };
    case AUTH:
      return { ...state, authUser: action.payload };

    default:
      return state;
  }
};

export default mainReducer;
