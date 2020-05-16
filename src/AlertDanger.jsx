import React from "react";

const AlertDanger = ({ children }) => (
  <div className="uk-alert-danger" data-uk-alert>
    <p>{children}</p>
  </div>
);

export default AlertDanger;
