import React, { useCallback } from "react";

const RequestAccess = ({ onAccess }) => {
  const handleClick = useCallback(
    e => {
      e.preventDefault();
      navigator.getMedia(
        { video: true },
        function() {
          onAccess(true);
        },
        function() {
          onAccess(false);
        }
      );
    },
    [onAccess]
  );

  return (
    <div className="uk-width-large@l uk-width-expand uk-text-center">
      <div data-uk-alert>
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
