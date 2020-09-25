import React from "react"

function Button(props){
  return <button type={props.type} onClick={props.onClick}>{props.name}</button>;
}

Button.defaultProps = {
  type : "submit",
  onClick : null,
  name : "Submit"
};

export default Button;
