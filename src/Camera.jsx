import React, {useContext} from "react";
import FacesDetector from "./FacesDetector";
import StoreContext from "./StoreContext";
import PersonInfo from "./PersonInfo";

const Camera = () => {
    const {state} = useContext(StoreContext);
    const face = state.faceResult;
    const status = state.statusRecognition;
    return (
        <div
            className="uk-position-relative"
        >
            {state.selectedDevice && (
                <FacesDetector>
                    {face && (
                        <PersonInfo person={face}/>
                    )}
                </FacesDetector>
            )}
            <p className="uk-margin-remove uk-text-center">
                <small className="uk-text-small">{status}... </small>
            </p>
        </div>
    );
};

export default Camera;
