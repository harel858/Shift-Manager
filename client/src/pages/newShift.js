import classes from "./pagesCss/newShift.module.css";
import Clock from "../components/ui/clock.js";
import { useState, useRef, useEffect } from "react";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import ShiftPayment from "../components/ui/shiftPayment";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function NewShift() {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch("http://localhost:5000/user", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const userData = await res.json();
          setUser(userData[0]);
        } else {
          const badRes = await res.json();
          console.log(badRes);
          setError(badRes);
        }
      } catch (err) {
        throw err;
      }
    };
    getUserData();
  }, []);
  const [seconds, setSeconds] = useState(0);
  const [play, isPlay] = useState();
  const today = new Date();
  const todayDate = today.toISOString().slice(0, 10);
  const shiftDetails = useRef({
    start: null,
    end: null,
    date: null,
    timeSpending: null,
    totalProfit: null,
    startSeconds: null,
    seconds: null,
  });
  if (localStorage.getItem("shiftDetails")) {
    shiftDetails.current = JSON.parse(localStorage.getItem("shiftDetails"));
  }
  if (!user) {
    return (
      <div className={classes.container}>
        <header className={classes.header}>
          <h1>{error}</h1>
        </header>
        <Nav className={classes.navLink} as={Link} to="/login">
          Click Here to Log In
        </Nav>
        <h3>Not registered yet?</h3>
        <Nav className={classes.navLink} as={Link} to="/">
          Register Now
        </Nav>
      </div>
    );
  }

  return (
    <>
      <section className={classes.clockSection}>
        <header className={classes.header}>
          <h1>Hello {user.name} Start Your Shift</h1>
          <h3 className={classes.clockDate}>{todayDate}</h3>
        </header>
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
