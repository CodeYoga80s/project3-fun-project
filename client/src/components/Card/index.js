import React from "react";
//import CardBtn from "../CardBtn";
import "./style.css";

function Card(props) {
  return (
    <div
      className="card"
      id={props.id}
      title={props.title}
     /*  onClick={() => props.handleClick(props.id)} */
      style={{
        backgroundImage: props.image ? `url(${props.image})` : "none"
      }}
    >
      {!props.image && <i className="fa fa-spinner fa-spin" aria-hidden="true" />}

    </div>
  );
}

export default Card;
