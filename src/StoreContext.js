import { createContext } from "react";

export const initialState = {
  faceResult: undefined,
  statusRecognition: undefined,
  selectedDevice: undefined
};

const StoreContext = createContext(initialState);

export default StoreContext;
