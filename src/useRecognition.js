import { useState, useRef, useCallback, useEffect } from "react";
import {
  loadTinyFaceDetectorModel,
  loadFaceExpressionModel,
  loadAgeGenderModel,
  loadFaceRecognitionModel,
  detectSingleFace,
  TinyFaceDetectorOptions,
  resizeResults,
  matchDimensions,
  // getMediaDimensions,
  draw
} from "face-api.js";

const faceDetectorOptions = new TinyFaceDetectorOptions({
  inputSize: 224,
  scoreThreshold: 0.5
});

export const STARTING_STATUS = "Iniciando";
export const LOADING_MODELS_STATUS = "Carregando Modelos";
export const LOADING_MODELS_ERROR_STATUS = "Erro ao tentar carregar modelos";
export const WAITING_VIDEO_STATUS = "Aguardando video";
export const STARTING_DETECTIONS_STATUS = "Detectando rostos";
export const READY_STATUS = "Concluído";

const useRecognition = (ready, canvasEl, videoEl) => {
  const contextCanvas = useRef(null);
  const requestAnimationFrameToken = useRef(null);
  const [status, setStatus] = useState(STARTING_STATUS);
  const [error, setError] = useState(undefined);
  const [faceDetected, setFaceDetected] = useState(undefined);

  const startDetection = useCallback(async () => {
    if (requestAnimationFrameToken.current) {
      window.cancelAnimationFrame(requestAnimationFrameToken.current);
    }

    if (videoEl.readyState === videoEl.HAVE_ENOUGH_DATA) {
      setStatus(STARTING_DETECTIONS_STATUS);
      const face = await detectSingleFace(videoEl, faceDetectorOptions)
          .withAgeAndGender()
          .withFaceExpressions();

      setStatus(READY_STATUS);
      if (face) {
        setFaceDetected(face);
        const dims = matchDimensions(canvasEl, videoEl, true);
        const resizedResults = resizeResults(face, dims);
        draw.drawDetections(canvasEl, resizedResults);
        draw.drawFaceExpressions(canvasEl, resizedResults);
      } else {
        setFaceDetected(undefined);
        contextCanvas.current.clearRect(
            0,
            0,
            videoEl.videoWidth,
            videoEl.videoHeight
        );
      }
    } else {
      setStatus(WAITING_VIDEO_STATUS);
    }
    requestAnimationFrameToken.current = requestAnimationFrame(startDetection);
  }, [videoEl, canvasEl]);

  useEffect(() => {
    async function loadModels() {
      try {
        setStatus(LOADING_MODELS_STATUS);
        setError(undefined);
        await Promise.all([
          loadTinyFaceDetectorModel("/models"),
          loadFaceExpressionModel("/models"),
          loadFaceRecognitionModel("/models"),
          loadAgeGenderModel("/models")
        ]);
        contextCanvas.current = canvasEl.getContext("2d");
        startDetection();
      } catch (error) {
        setError(error);
        setStatus(LOADING_MODELS_ERROR_STATUS);
      }
    }
    if (ready) {
      loadModels();
    }
  }, [ready, canvasEl, startDetection]);

  // useEffect(() => {
  //   function playingCallback() {
  //     console.log("Playing....");
  //   }

  //   if (videoEl) {
  //     videoEl.addEventListener("playing", playingCallback);
  //   }
  //   return () => {
  //     if (videoEl) {
  //       videoEl.removeEventListener("playing", playingCallback);
  //     }
  //   };
  // }, [videoEl]);

  return { status, error, faceDetected: faceDetected };
};

export default useRecognition;
