import { useState, useEffect } from "react";
import ShiftList from "../components/shifts/ShiftList.js";
import classes from "./pagesCss/allShifts.module.css";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Card from "../components/ui/card.js";

function AllShifts() {
  const [shiftList, setShiftList] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function asyncFun() {
      try {
        const res = await fetch("http://localhost:5000/shifts", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const shifts = await res.json();
          setShiftList(shifts);
        } else {
          const badRes = await res.json();
          console.log(badRes);
          setError(badRes);
        }
      } catch (err) {
        throw err;
      }
    }
    asyncFun();
  }, []);

  if (error) {
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
      <header className={classes.header}>
        <h1> Your Shifts</h1>
      </header>
      <ShiftList shiftList={shiftList} />
    </>
  );
}
export default AllShifts;
