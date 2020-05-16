import React, {
  useMemo,
  Fragment,
  useRef,
  useContext,
  useLayoutEffect
} from "react";
import AlertDanger from "./AlertDanger";
import useVideoStream from "./useVideoStream";
import useRecognition from "./useRecognition";
import StoreContext from "./StoreContext";
import { SET_STATUS_RECOGNITION, SET_FACES_RESULT } from "./reducers";

const FacesDetector = () => {
  const { state, dispatch } = useContext(StoreContext);

  const canvasRef = useRef(null);
  const constraints = useMemo(() => {
    return {
      audio: false,
      video: {
        facingMode: "user",
        // aspectRatio: 1.777777778,
        width: {
          min: 320
        },
        height: {
          min: 240
        },
        frameRate: {
          ideal: 60,
          min: 10
        }
      },
      deviceId: {
        exact: state.selectedDevice.deviceId
      }
    };
  }, [state]);

  const {
    ref: videoRef,
    isStarting: isStartingCamera,
    error,
    streamRef
  } = useVideoStream(constraints);

  const {
    status: statusRecognition,
    error: errorRecognition,
    facesDetected
  } = useRecognition(
    streamRef.current && !isStartingCamera,
    canvasRef.current,
    videoRef.current
  );

  useLayoutEffect(() => {
    dispatch({ type: SET_STATUS_RECOGNITION, payload: statusRecognition });
    dispatch({ type: SET_FACES_RESULT, payload: facesDetected });
  }, [dispatch, facesDetected, statusRecognition]);

  return (
    <div className="uk-position-relative uk-flex uk-flex-center uk-flex-middle uk-width-medium uk-width-large@l uk-height-medium">
      {isStartingCamera && (
        <Fragment>
          <div className="uk-overlay-primary uk-position-cover" />
          <div className="uk-overlay uk-position-center uk-light">
            <div data-uk-spinner />
          </div>
        </Fragment>
      )}
      {error && <AlertDanger>{error.message}</AlertDanger>}
      {errorRecognition && (
        <AlertDanger>{errorRecognition.message}</AlertDanger>
      )}
      <video
        className="uk-width-medium uk-width-large@m uk-position-absolute"
        ref={videoRef}
      />
      <canvas
        className="uk-width-medium uk-width-large@m uk-position-absolute"
        ref={canvasRef}
      />
    </div>
  );
};

export default FacesDetector;
