import React from "react";

export default props => (
  <button className="btn btn-default btn-sm" onClick={props.handler}>
    {props.text}
  </button>
);
