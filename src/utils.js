const _getMedia =
    navigator.getUserMedia || // use the proper vendor prefix
    navigator.webkitGetUserMedia ||
    navigator.moxGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

navigator.getMedia = _getMedia;

export const getMediaFor = (constraintToUse) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        return navigator.mediaDevices.getUserMedia(constraintToUse);
    }
    return navigator.getMedia
        ? navigator.getMedia(constraintToUse)
        : _getMedia(constraintToUse);
};


// const _getWebcam =
//     navigator.getUserMedia ||
//     navigator.webKitGetUserMedia ||
//     navigator.moxGetUserMedia ||
//     navigator.mozGetUserMedia ||
//     navigator.msGetUserMedia;
//
// const getWebCamFor =
//     (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) ||
//     _getWebcam;
//
// export const getMediaFor = (constraintToUse) => {
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//         return getWebCamFor(constraintToUse);
//     }
//     return getWebCamFor(constraintToUse);
// };
