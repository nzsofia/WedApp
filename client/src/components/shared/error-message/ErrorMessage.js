import React from "react";
import './ErrorMessage.scss';
import Typography from "@material-ui/core/Typography";
import WarningIcon from '@material-ui/icons/Warning';

function ErrorMessage(props){

  return (
    <div className="error-message-container">
      <WarningIcon className="warning-icon"/>
      <Typography variant="h5" color="error" className="message">{props.children}</Typography>
    </div>
  );
}

export default ErrorMessage;
