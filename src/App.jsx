import React, { useCallback, useReducer, useEffect, useState } from "react";
import CameraAccess from "./CameraAccess";
import StoreContext, { initialState } from "./StoreContext";
import Devices from "./Devices";
import mainReducer, {AUTH} from "./reducers";
import Camera from "./Camera";
import app from './base';
import { getUserProfile } from './api/users';

const useAuth = function(callback) {

    const [ isAuthenticating, setIsAuthenticating ] = useState(true);

    const handleAuthStateChanged = useCallback(async (user) => {
        callback(user);
        if (user) {
            const profile = await getUserProfile(user.uid).get()
            console.log(profile.data())
        } else {
            await app.auth().signInAnonymously();
        }
        setIsAuthenticating(false);
    }, [callback])

    useEffect(() => {
        const subscriptionAuth = app.auth().onAuthStateChanged(handleAuthStateChanged);
        return () => {
            if (subscriptionAuth) {
                subscriptionAuth();
            }
        }
    }, [])

    return isAuthenticating

}

export default function App() {
    const [state, dispatch] = useReducer(mainReducer, initialState);
    const [handleCameraAccess, setHandleCameraAccess] = useState(false);

    useAuth((user) => {
        dispatch({ type: AUTH, payload: user });
        console.log('User authenticated', user);
    })

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            <nav className="uk-navbar-container" data-uk-navbar="">
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

            {handleCameraAccess && <Camera />}

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

            <p className="uk-text-meta uk-text-muted uk-text-small uk-margin-small uk-text-center">
                <a
                    href="https://github.com/ridermansb"
                    target="_blank"
                >
                    made by ridermansb
                </a>
            </p>
        </StoreContext.Provider>
    );
}
