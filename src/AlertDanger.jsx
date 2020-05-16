import React from "react";

const AlertDanger = ({ title, children }) => (
  <div className="uk-alert-danger" data-uk-alert="">
      {title && (<h3>{title}</h3>)}
    <p>{children}</p>
  </div>
);

export default AlertDanger;
