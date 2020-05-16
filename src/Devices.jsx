import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  Fragment
} from "react";
import clsx from "clsx";
import useDropDown from "./useDropDown";
import StoreContext from "./StoreContext";
import { SELECT_DEVICE } from "./reducers";

const Device = ({ device, active }) => {
  const { dispatch } = useContext(StoreContext);
  const className = clsx({
    "uk-active": active
  });

  const handleCkick = useCallback(
    e => {
      e.preventDefault();
      dispatch({ type: SELECT_DEVICE, payload: device });
    },
    [device, dispatch]
  );

  return (
    <li className={className}>
      <button className="uk-button uk-button-text" onClick={handleCkick}>
        {device.label}
      </button>
    </li>
  );
};

const Devices = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    async function loadDevices() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        device => device.kind === "videoinput"
      );
      setDevices(videoDevices);
      if (videoDevices.length > 0) {
        dispatch({ type: SELECT_DEVICE, payload: videoDevices[0] });
      }
    }

    loadDevices();
  }, [dispatch]);

  const dropdownRef = useDropDown({
    mode: "click",
    boundary: "! .uk-button-group",
    "boundary-align": true
  });

  return (
    <Fragment>
      <a href="#">
        {state.selectedDevice
          ? state.selectedDevice.label
          : "Selecionar câmera"}
        <span data-uk-icon="icon:  triangle-down" />
      </a>
      <div className="uk-navbar-dropdown" ref={dropdownRef}>
        <ul className="uk-nav uk-navbar-dropdown-nav">
          {devices.map(device => (
            <Device
              device={device}
              key={device.deviceId}
              active={
                state.selectedDevice &&
                device.deviceId === state.selectedDevice.deviceId
              }
            />
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default Devices;
