import React, {useCallback, useState} from "react";
import AlertDanger from "./AlertDanger";
import RequestAccess from "./RequestAccess";

const CameraAccess = ({onAccess}) => {
    const [hasCameraAccess, setHasCameraAccess] = useState(undefined);
    const [error, setError] = useState(undefined);

    const handleOnAccess = useCallback((error, accessAllowed) => {
        setHasCameraAccess(accessAllowed);
        setError(error);
        if (accessAllowed) {
            onAccess(accessAllowed);
        }
    }, [setHasCameraAccess]);

    return (
        <div className="uk-flex uk-flex-center uk-flex-middle uk-flex-column">
            {hasCameraAccess === undefined && (
                <RequestAccess onAccess={handleOnAccess}/>
            )}

            {error && (
                <AlertDanger title="Falha ao tentar acessar a camera">
                    {error.message}
                </AlertDanger>
            )}
        </div>
    );
};

export default CameraAccess;
