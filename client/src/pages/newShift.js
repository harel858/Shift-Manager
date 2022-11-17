import classes from "./style/newShift.module.css";
import Clock from "../components/ui/clock.js";
import { useState, useRef, useContext } from "react";
import { forwardRef } from "react";
import ShiftPayment from "../components/ui/shiftPayment";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import UserContext from "../context/userContext.js";

function NewShift() {
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);
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
      start: `${currentDateAndHour} `,
      end: null,
      date: `${currentDate}`,
      startSeconds: today.getTime(),
      pausedSeconds: 0,
      startAgain: 0,
      timeSpend: `00:00:00`,
      totalProfit: 0,
      seconds: seconds,
      basicPayment: 0,
      firstOverTimePay: 0,
      overTimePay: 0,
    };
  }
  console.log(user);

  if (localStorage.getItem("shiftDetails"))
    shiftDetails.current = JSON.parse(localStorage.getItem("shiftDetails"));

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
