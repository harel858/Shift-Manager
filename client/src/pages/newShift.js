import classes from "./pagesCss/newShift.module.css";
import Clock from "../components/ui/clock.js";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import ShiftPayment from "../components/ui/shiftPayment";

function NewShift() {
  const [user, setUser] = useState();
  const [error, setError] = useState();
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
        throw { err };
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
  });
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
    <section className={classes.clockSection}>
      <header className={classes.header}>
        <h1>Hello {user.name} Start Your Shift</h1>
        <h3>{todayDate}</h3>
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
      />
    </section>
  );
}
export default NewShift;
