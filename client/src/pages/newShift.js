import classes from "./style/newShift.module.css";
import Clock from "../components/ui/clock.js";
import { useState, useRef, useContext } from "react";
import UserContext from "../context/userContext.js";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import ShiftPayment from "../components/ui/shiftPayment";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LinearColor from "../components/ui/loading.js";
import CurrentShift from "../context/currentShiftContext";

function NewShift() {
  const { loginError, user, loading } = useContext(UserContext);
  const { currentShift, createCurrentShift } = useContext(CurrentShift);
  const [open, setOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [play, isPlay] = useState();
  const shiftDetails = useRef();
  const today = new Date();
  const todayDate = today.toISOString().slice(0, 10);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  if (!currentShift) {
    const today = new Date();
    const currentDateAndHour = today.toLocaleString();
    const currentDate = today.toLocaleString("en-US", { month: "long" });
    createCurrentShift(
      user.workPlaces[0],
      `${currentDateAndHour} `,
      `${currentDate}`,
      today.getTime(),
      0,
      0
    );
  }

  if (currentShift) shiftDetails.current = currentShift;
  if (loading) {
    return <LinearColor />;
  }
  if (loginError) {
    return (
      <div className={classes.errorContainer}>
        <header className={classes.header}>
          <h1>{loginError}</h1>
        </header>
        <Nav className={classes.navLink} as={Link} to="/">
          Click Here to Log In
        </Nav>
        <h3>Not registered yet?</h3>
        <Nav className={classes.navLink} as={Link} to="/register">
          Register Now
        </Nav>
      </div>
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
