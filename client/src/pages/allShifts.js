/* import ShiftList from "../components/shifts/ShiftList.js"; */
import classes from "./style/allShifts.module.css";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import ShiftList2 from "../components/shifts/ShiftList2.js";
import ShiftSummary from "../components/shifts/ShiftSummary.js";
import MonthStepper from "../components/shifts/MonthStepper.js";
import { useContext, useEffect, useState } from "react";
import ShiftContext from "../context/shiftContext.js";
import UserContext from "../context/userContext.js";

function AllShifts() {
  const byDate = (a, b) => {
    const d1 = new Date(a.start);
    const d2 = new Date(b.start);

    if (d1.getUTCMonth() > d2.getUTCMonth()) {
      return 1;
    }
    if (d1.getUTCMonth() < d2.getUTCMonth()) {
      return -1;
    } else {
      return d1.getUTCDate - d2.getUTCDate();
    }
  };

  const shiftsCtx = useContext(ShiftContext);
  const { loginError } = useContext(UserContext);
  const allShiftList = shiftsCtx.shifts.sort(byDate);

  const [counter, setCounter] = useState(0);
  const [months, setMonths] = useState([
    null,
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [shiftList, setShiftList] = useState([]);

  useEffect(() => {
    let shiftsOfMonth = [];
    allShiftList.map((shift, i) => {
      if (shift.date === months[counter]) {
        shift.index = i;
        shiftsOfMonth.push(shift);
      }
      return shiftsOfMonth;
    });
    return setShiftList(shiftsOfMonth);
  }, [counter, months, allShiftList]);

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
      {/*  <ShiftList shiftList={shiftList} /> */}
      <MonthStepper
        counter={counter}
        setCounter={setCounter}
        months={months}
        setMonths={setMonths}
      />
      <ShiftList2
        counter={counter}
        setCounter={setCounter}
        months={months}
        setMonths={setMonths}
        shiftList={shiftList}
      />
      <ShiftSummary
        counter={counter}
        setCounter={setCounter}
        months={months}
        setMonths={setMonths}
        shiftList={shiftList}
      />
    </>
  );
}
export default AllShifts;
