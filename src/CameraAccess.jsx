import React, { useCallback, useState } from "react";
import AlertDanger from "./AlertDanger";
import RequestAccess from "./RequestAccess";

const CameraAccess = ({ onAccess }) => {
    const [hasCameraAccess, setHasCameraAcces] = useState(undefined);
    const handleOnAccess = useCallback(accessAllowed => {
        setHasCameraAcces(accessAllowed);
        if (accessAllowed) {
            onAccess(accessAllowed);
        }
    }, []);

    return (
        <div className="uk-flex uk-flex-center uk-flex-middle uk-flex-column">
            {hasCameraAccess === undefined && (
                <RequestAccess onAccess={handleOnAccess} />
            )}

            {hasCameraAccess === false && (
                <AlertDanger>
                    Humm.. infelizmente sem acesso a câmera não somos úteis
                </AlertDanger>
            )}
        </div>
    );
};

export default CameraAccess;
