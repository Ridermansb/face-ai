import React, { useContext, useEffect, useRef } from "react";
import UiKit from 'uikit';
import FacesDetector from "./FacesDetector";
import StoreContext from "./StoreContext";
import { PersonInfo } from "./Dashboard";

const Camera = () => {
  const { state } = useContext(StoreContext);
  const faces = state.facesResult;
  const status = state.statusRecognition;

  return (
      <div
          className="uk-position-relative"
          data-uk-height-match="target: #face-detector"
      >
        {state.selectedDevice && (
            <FacesDetector>
              <div className="uk-overlay uk-dark uk-position-bottom uk-position-small">
                {faces && faces.length > 0 ? (
                    <PersonInfo person={faces[0]} />
                ) : (
                    <small className="uk-text-small uk-dark">{status}... </small>
                )}
              </div>
            </FacesDetector>
        )}
      </div>
  );
};

export default Camera;
