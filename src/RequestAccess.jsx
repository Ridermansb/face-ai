import React, {useCallback} from "react";
import {getMediaFor} from "./utils";

const RequestAccess = ({onAccess}) => {
    const handleClick = useCallback(
        async e => {
            e.preventDefault();
            try {
                const log = await getMediaFor({video: true, audio: false});
                onAccess(null, log);
            } catch (error) {
                onAccess(error);
            }
        },
        [onAccess]
    );

    return (
        <div className="uk-width-large@l uk-width-expand uk-text-center">
            <div data-uk-alert="">
                <p className="uk-text-lead">
                    PARA DETECTAR SUA FACE PRECISAMOS DE ACESSO A SUA CÂMERA.
                </p>
                <button
                    className="uk-button uk-button-primary uk-button-large"
                    onClick={handleClick}
                >
                    Permir acesso
                </button>
            </div>
        </div>
    );
};

export default RequestAccess;
