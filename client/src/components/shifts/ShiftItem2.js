import { MdDelete, MdEdit } from "react-icons/md";
import classes from "./shiftsCss/shiftItem2.module.css";
import { useContext, useRef, useState, forwardRef } from "react";
import ShiftContext from "../../context/shiftContext.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import UserContext from "../../context/userContext.js";

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

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ShiftItem2({ shift }) {
  const [open, setOpen] = useState(false);
  const [editor, setEditor] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const inputStartRef = useRef(shift.start);
  const inputEndRef = useRef(shift.end);

  const { deleteShift, updateShift } = useContext(ShiftContext);
  const { payment, currency } = useContext(UserContext);

  function openDialog() {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    setOpen((prev) => !prev);
    try {
      deleteShift(shift);
    } catch (err) {
      console.log(err);
    }
  };
  const calculationFunc = (seconds) => {
    if (seconds <= 0) return setErrorOpen(true);
    let basicPayment = 0;
    let firstOverTime = 0;
    let overTime = 0;

    for (let i = 0; i <= seconds; i++) {
      if (i <= 28800) {
        basicPayment = (((i / 60) * payment) / 60).toFixed(2);
      }

      // Calculation of pay for the first two overtime hours
      if (28800 <= i && i <= 36000) {
        firstOverTime = ((((i - 28800) / 60) * (payment * 1.25)) / 60).toFixed(
          2
        );
      }
      //Calculation of the remaining overtime hours
      if (i > 36000) {
        overTime = ((((i - 36000) / 60) * (payment * 1.5)) / 60).toFixed(2);
      }
    }
    firstOverTime = Math.floor(firstOverTime);
    overTime = Math.floor(overTime);

    let totalProfit = +basicPayment + +firstOverTime + +overTime;

    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - hrs * 3600) / 60);
    let secs = seconds % 60;
    hrs = (`0` + hrs).slice(-2);
    mins = (`0` + mins).slice(-2);
    secs = (`0` + secs).slice(-2);
    let timeSpend = `${hrs}:${mins}:${secs}`;

    let newShift = {
      basicPayment,
      firstOverTime,
      overTime,
      totalProfit,
      timeSpend,
      seconds,
    };
    return newShift;
  };

  const saveChanges = () => {
    let startTime = inputStartRef?.current?.placeholder;
    let endTime = inputEndRef?.current?.placeholder;
    let date = shift.date;
    let startSeconds = Math.floor(new Date(startTime).getTime() / 1000);
    let endSeconds = Math.floor(new Date(endTime).getTime() / 1000);
    if (inputStartRef?.current?.value) {
      startSeconds = Math.floor(
        new Date(inputStartRef.current.value).getTime() / 1000
      );
      startTime = new Date(inputStartRef.current.value).toLocaleString();
      date = new Date(inputStartRef.current.value).toLocaleString("default", {
        month: "long",
      });
    }
    if (inputEndRef?.current?.value) {
      endSeconds = Math.floor(
        new Date(inputEndRef.current.value).getTime() / 1000
      );
      endTime = new Date(inputEndRef.current.value).toLocaleString();
    }
    let newShift = calculationFunc(endSeconds - startSeconds);
    newShift.start = startTime;
    newShift.end = endTime;
    newShift.date = date;

    updateShift(
      shift.index,
      shift._id,
      newShift.start,
      newShift.end,
      newShift.timeSpend,
      newShift.totalProfit,
      newShift.basicPayment,
      newShift.firstOverTime,
      newShift.overTime,
      newShift.seconds,
      newShift.date,
      setEditor
    );
  };

  return (
    <>
      <tr>
        <td className={editor ? classes.open_td : undefined} data-label="Start">
          {editor ? (
            <input
              type="text"
              onFocus={(e) => (e.target.type = "datetime-local")}
              ref={inputStartRef}
              className={classes.editorInput}
              placeholder={`${shift.start}`}
            />
          ) : (
            shift.start
          )}
        </td>
        <td className={editor ? classes.open_td : undefined} data-label="End">
          {editor ? (
            <input
              type="text"
              onFocus={(e) => (e.target.type = "datetime-local")}
              ref={inputEndRef}
              className={classes.editorInput}
              placeholder={`${shift.end}`}
            />
          ) : (
            shift.end
          )}
        </td>
        <td data-label="Time Spend">
          <p>{`${shift.timeSpend}`}</p>
        </td>
        <td data-label="Total Earning">
          <p className={classes.money}>
            {shift.totalProfit}
            <span className={classes.currencyLabel}>{currency.label}</span>
          </p>
        </td>
        <td data-label="Action" className={classes.btnContainer}>
          {editor ? (
            <button onClick={saveChanges} className={classes.saveEditBtn}>
              save
            </button>
          ) : (
            <button onClick={() => setEditor(true)} className={classes.editBtn}>
              <MdEdit className={classes.btn} />
            </button>
          )}

          {editor ? (
            <button
              onClick={() => setEditor((prev) => !prev)}
              className={classes.cancelBtn}
            >
              cancel
            </button>
          ) : (
            <button onClick={openDialog} className={classes.trashBtn}>
              <MdDelete className={classes.btn} />
            </button>
          )}
        </td>
      </tr>

      {/* delete Dialog */}
      <Dialog
        open={open}
        onClose={handleClose || handleDelete}
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
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Snackbar */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={() => setErrorOpen(false)}
      >
        <Alert
          onClose={() => setErrorOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Shift must be above 0 seconds!
        </Alert>
      </Snackbar>
    </>
  );
}