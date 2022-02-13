import React, {useState } from "react";
import "./arrow.css";

export default function Faq(props) {
  const [expand, setExpand] = useState(false);
  const arrowChange = () => {
    setExpand(!expand);
  };
  return (
    <div onClick={arrowChange} style={{ marginBottom: "10px" }}>
      <span>
        <i
          style={{ marginRight: "20px" }}
          class={expand === false ? "arrow right" : "arrow down"}
        ></i>
      </span>
      {props.question}
      <>
        {expand && (
          <p style={{ marginLeft: "45px", opacity: ".50" }}>{props.answer}</p>
        )}
      </>
    </div>
  );
}
