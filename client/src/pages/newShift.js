import classes from "./style/newShift.module.css";
import Clock from "../components/ui/clock.js";
import { useState, useRef, useContext } from "react";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import ShiftPayment from "../components/ui/shiftPayment";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import UserContext from "../context/userContext.js";
import Alerts from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function NewShift() {
  const [open, setOpen] = useState(false);
  const { loginError, user } = useContext(UserContext);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [seconds, setSeconds] = useState(0);
  const [play, isPlay] = useState();
  const shiftDetails = useRef();
  const today = new Date();
  const todayDate = today.toISOString().slice(0, 10);

  if (!localStorage.getItem("shiftDetails")) {
    const today = new Date();
    const currentDateAndHour = today.toLocaleString();
    const currentDate = today.toLocaleString("en-US", { month: "long" });

    shiftDetails.current = {
      workPlace: user?.workPlaces[0],
      start: `${currentDateAndHour} `,
      end: null,
      date: `${currentDate}`,
      startSeconds: today.getTime(),
      pausedSeconds: 0,
      startAgain: 0,
      timeSpend: null,
      totalProfit: null,
      seconds: seconds,
      basicPayment: 0,
      firstOverTimePay: 0,
      overTimePay: 0,
    };
  }

  if (localStorage.getItem("shiftDetails"))
    shiftDetails.current = JSON.parse(localStorage.getItem("shiftDetails"));

  if (!user) {
    return (
      <Alerts className={classes.noShiftAlert} severity="error">
        <AlertTitle>ERROR</AlertTitle>
        <strong>{loginError}</strong>
        <Link className={classes.navLink} as={Link} to="/">
          Click Here to Log In
        </Link>
        <h3>Not registered yet?</h3>
        <Link className={classes.navLink} as={Link} to="/register">
          Register Now
        </Link>
      </Alerts>
    );
  }

  return (
    <>
      <section className={classes.clockSection}>
        <header className={classes.header}>
          <h1>Welcome {user?.name}!</h1>
          <h3 className={classes.clockDate}>{todayDate}</h3>
        </header>
        <div className={classes.clockAndEarning}>
          <Clock
            todayDate={todayDate}
            shiftDetails={shiftDetails}
            play={play}
            isPlay={isPlay}
            seconds={seconds}
            setSeconds={setSeconds}
          />
          <ShiftPayment
            shiftDetails={shiftDetails}
            setSeconds={setSeconds}
            isPlay={isPlay}
            play={play}
            seconds={seconds}
            setOpen={setOpen}
          />
        </div>
      </section>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Your shift has been successfully saved!
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
export default NewShift;
