import { useCallback, useState, useEffect, useRef } from "react";

navigator.getMedia =
  navigator.getUserMedia || // use the proper vendor prefix
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

function useVideoStream(constraints = {}) {
  const videoRef = useRef(null);
  const [error, setError] = useState(undefined);
  const [isStartingStream, setIsStartingStream] = useState(true);
  const streamRef = useRef(null);

  const startStream = useCallback(async () => {
    try {
      setIsStartingStream(true);
      setError(undefined);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if ("srcObject" in videoRef.current) {
        // eslint-disable-next-line require-atomic-updates
        videoRef.current.srcObject = stream;
      } else {
        // Avoid using this in new browsers, as it is going away.
        // eslint-disable-next-line require-atomic-updates
        videoRef.current.src = URL.createObjectURL(stream);
      }

      // https://stackoverflow.com/a/54678952
      videoRef.current.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      videoRef.current.setAttribute("autoplay", "");
      videoRef.current.setAttribute("muted", "");
      // videoRef.current.pause();
      videoRef.current.play();
      streamRef.current = stream;
    } catch (error) {
      setError(error);
    } finally {
      setIsStartingStream(false);
    }
  }, [constraints, videoRef, streamRef]);

  useEffect(() => {
    startStream();
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    const streamEl = streamRef.current;
    return () => {
      if (videoEl) {
        streamEl && streamEl.stop && streamEl.stop();
        streamRef.current = undefined;
        videoEl.src = null;
        videoRef.current = undefined;
      }
    };
  }, [streamRef, videoRef]);

  return { ref: videoRef, isStarting: isStartingStream, error, streamRef };
}

export default useVideoStream;
