import React from "react";

function Input(props) {

  return (
    <input
      onChange={props.onChange}
      value={props.value}
      name={props.name}
      placeholder={props.placeholder}
      type={props.type}
    />
  );
}

Input.defaultProps = {
  onChange : null,
  value : null,
  name : "input",
  placeholder : "Input",
  type : "text"
};

export default Input;
