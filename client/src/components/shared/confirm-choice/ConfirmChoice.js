import React from "react";
import "./ConfirmChoice.scss";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { Button, DialogContentText } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";

function ConfirmChoice(props) {
  const {
    open,
    setOpen,
    onConfirm = () => {},
    text = "Are you sure you leave this page?",
    confirmText = "Yes",
    denyText = "No"
  } = props;

  return (
    <Dialog open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="confirm-title"
            aria-describedby="confirm-description">
      <DialogTitle id="confirm-title">Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-description">{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">{denyText}</Button>
        <Button onClick={() => {
          setOpen(false);
          onConfirm();
        }} color="primary" autoFocus>{confirmText}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmChoice;
