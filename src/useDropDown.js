import { useEffect, useRef } from "react";
import UiKit from "uikit";

const useDropDown = (opts = {}) => {
  const dropDownRef = useRef(null);

  useEffect(() => {
    const dropDownEl = dropDownRef.current;
    UiKit.dropdown(dropDownEl, opts);

    return () => {
      UiKit.dropdown(dropDownEl, opts).$destroy();
    };
    // data-uk-dropdown="mode: click; boundary: ! .uk-button-group; boundary-align: true;"
  }, [dropDownRef, opts]);

  return dropDownRef;
};

export default useDropDown;
