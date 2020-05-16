navigator.getMedia =
    navigator.getUserMedia || // use the proper vendor prefix
    navigator.webkitGetUserMedia ||
    navigator.moxGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

export const getMediaFor = ( constraintToUse, ...rest ) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        return navigator.mediaDevices.getUserMedia(constraintToUse, ...rest);
    }
    return navigator.getMedia(constraintToUse, ...rest);
};
