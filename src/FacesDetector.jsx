import React, {
    useMemo,
    Fragment,
    useRef,
    useContext,
    useLayoutEffect,
    useEffect, useCallback
} from "react";
import AlertDanger from "./AlertDanger";
import useVideoStream from "./useVideoStream";
import useRecognition from "./useRecognition";
import StoreContext from "./StoreContext";
import {SET_STATUS_RECOGNITION, SET_FACES_RESULT} from "./reducers";

const FacesDetector = ({children}) => {
    const {state, dispatch} = useContext(StoreContext);

    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    const constraints = useMemo(() => {
        const defaultConstraints = {
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
        };

        return {
            ...defaultConstraints,
            deviceId: state.selectedDevice
                ? {exact: state.selectedDevice.deviceId}
                : undefined
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
        faceDetected
    } = useRecognition(
        streamRef.current && !isStartingCamera,
        canvasRef.current,
        videoRef.current
    );

    useLayoutEffect(() => {
        dispatch({type: SET_STATUS_RECOGNITION, payload: statusRecognition});
        dispatch({type: SET_FACES_RESULT, payload: faceDetected});
    }, [dispatch, faceDetected, statusRecognition]);


    const handleOnReady = useCallback(() => {
            const containerEl = containerRef.current;
            // const videoEl = videoRef.current;
            if (containerEl) {
                containerEl.setAttribute('style', `width: ${videoRef.current.offsetWidth}px; height: ${videoRef.current.offsetHeight}px`)
                // const canvasWidth = videoEl.offsetWidth > videoEl.videoWidth ? videoEl.videoWidth : videoEl.offsetWidth
                // const canvasHeight = videoEl.offsetHeight > videoEl.videoHeight ? videoEl.videoHeight : videoEl.offsetHeight
                // canvasRef.current.setAttribute('style', `width: ${canvasWidth}px; height: ${canvasHeight}px`)
            }
        }
        ,
        [containerRef, videoRef, canvasRef]
    )

    useEffect(() => {
        const videoEl = videoRef.current;
        if (videoEl) {
            videoEl.addEventListener('playing', handleOnReady)
        }

        return () => {
            if (videoEl) {
                videoEl.removeEventListener('playing', handleOnReady)
            }
        }
    }, [handleOnReady, videoRef])

    return (
        <Fragment>
            <div
                className="uk-position-relative uk-width-expand uk-height-max-large"
                data-uk-data-grid=""
                ref={containerRef}
            >
                {isStartingCamera && (
                    <Fragment>
                        <div className="uk-overlay-primary uk-position-cover"/>
                        <div className="uk-overlay uk-position-center uk-light">
                            <div data-uk-spinner=""/>
                        </div>
                    </Fragment>
                )}
                {error && <AlertDanger>{error.message}</AlertDanger>}
                {errorRecognition && (
                    <AlertDanger>{errorRecognition.message}</AlertDanger>
                )}
                <video className="uk-width-expand uk-position-absolute uk-height-max-large" ref={videoRef}
                       playsInline={true}
                       muted={true}
                       preload="none"
                />
                <canvas
                    className="uk-width-expand uk-position-absolute uk-height-max-large"
                    ref={canvasRef}
                />
            </div>
            {children}
        </Fragment>
    );
};

export default FacesDetector;
