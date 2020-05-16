import React, { useContext } from "react";
import FacesDetector from "./FacesDetector";
import StoreContext from "./StoreContext";

const Camera = () => {
  const { state } = useContext(StoreContext);
  return (
    <div className="uk-position-relative uk-width-1-1">
      {state.selectedDevice && <FacesDetector />}
    </div>
  );
};

export default Camera;
