import classes from "./card.module.css";
import "../shifts/shiftItem.css";
import { useContext, useState } from "react";
import ShiftContext from "../../context/shiftContext.js";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { BsTrash } from "react-icons/bs";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Card(props) {
  console.log("Card");
  const [open, setOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const shiftCtx = useContext(ShiftContext);

  function deleteItem() {
    setOpen(true);
  }

  const handleClose = (e) => {
    console.log(e.target.parentElement);
    setOpen(false);
    e.target.id == 1 && agreeClose();
  };
  const agreeClose = async () => {
    const currentShift = document.getElementById(`${props.index}`);
    try {
      shiftCtx.deleteShift(props.shift._id);
      currentShift.classList.add("fall");

      currentShift.addEventListener("transitionend", (e) =>
        currentShift.remove()
      );
    } catch (err) {
      console.log(err);
    }
  };
  const openHandler = () => {
    const currentShift = document.getElementById(`${props.index}`);
    console.log(currentShift);
    currentShift.classList.toggle("open");
    currentShift.childNodes[0].classList.toggle("openBtns");
  };
  return (
    <ul id={props.index} className={classes.shiftItem}>
      <li className={classes.cardBtns}>
        <div>
          <button
            onClick={() => setEditorOpen(true)}
            className={classes.trashBtn}
          >
            <BorderColorIcon className={classes.trash} />
          </button>

          <button onClick={deleteItem} className={classes.trashBtn}>
            <BsTrash className={classes.trash} />
          </button>
        </div>
        <h3 className={classes.cardHeader}>{props.shift.date}</h3>
        <button onClick={openHandler} className={classes.dropDownBtn}>
          <ArrowDropDownIcon className={classes.dropDown} />
        </button>
      </li>

      {props.children}
      {/* delete digalog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete the current shift?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            delete the current shift. This means delete it from the Data-Base.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button id="0" onClick={handleClose}>
            Disagree
          </Button>
          <Button id="1" onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* editor digalog */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={editorOpen}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Modal title
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setEditorOpen(false)}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </ul>
  );
}
