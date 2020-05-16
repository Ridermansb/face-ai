import React, { useReducer, useState } from "react";
import CameraAccess from "./CameraAccess";
import AlertDanger from "./AlertDanger";
import StoreContext, { initialState } from "./StoreContext";
import Devices from "./Devices";
import mainReducer from "./reducers";

const hasSupport =
  "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices;

export default function App() {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const [handleCameraAccess, setHandleCameraAccess] = useState(false);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <nav className="uk-navbar-container uk-margin" data-uk-navbar>
        <div className="uk-navbar-left">
          <a className="uk-navbar-item uk-logo" href="#">
            Acertô miseravi
          </a>

          <a
            className="uk-navbar-item"
            href="https://github.com/ridermansb"
            target="_blank"
          >
            made by ridermansb
          </a>
        </div>

        {handleCameraAccess && (
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li>
                <Devices />
              </li>
            </ul>
          </div>
        )}
      </nav>

      <div className="uk-container uk-margin-top">
        <div>
          {hasSupport ? (
            <CameraAccess onAccess={setHandleCameraAccess} />
          ) : (
            <AlertDanger>
              Ops... este dispositivo não tem suporte a este recurso
            </AlertDanger>
          )}
        </div>
      </div>
    </StoreContext.Provider>
  );
}
