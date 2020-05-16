import React, { useReducer, useState } from "react";
import CameraAccess from "./CameraAccess";
import StoreContext, { initialState } from "./StoreContext";
import Devices from "./Devices";
import mainReducer from "./reducers";
import Camera from "./Camera";

export default function App() {
    const [state, dispatch] = useReducer(mainReducer, initialState);
    const [handleCameraAccess, setHandleCameraAccess] = useState(false);
    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            <nav className="uk-navbar-container" data-uk-navbar>
                <div className="uk-navbar-left">
                    <a className="uk-navbar-item uk-logo" href="#">
                        Acertô miseravi
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

            {handleCameraAccess === true && <Camera />}

            {!handleCameraAccess && (
                <div className="uk-container uk-margin-top uk-text-center">
                    <p>
                        Quer apostar que identifico sua{" "}
                        <span className="uk-text-lead">idade</span>, seu{" "}
                        <span className="uk-text-lead">gênero</span> e sua{" "}
                        <span className="uk-text-lead">expressão</span>?
                    </p>
                    <CameraAccess onAccess={setHandleCameraAccess} />
                </div>
            )}

            <p className="uk-text-meta uk-text-muted uk-text-small">
                <a
                    className="uk-navbar-item"
                    href="https://github.com/ridermansb"
                    target="_blank"
                >
                    made by ridermansb
                </a>
            </p>
        </StoreContext.Provider>
    );
}
