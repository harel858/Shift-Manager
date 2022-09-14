import classes from "./pagesCss/newShift.module.css";
import Clock from "../ui/clock";
import { useState } from "react";
import ShiftPayment from "../ui/shiftPayment";
function NewShift() {
  let [seconds, setSeconds] = useState(0);
  const [play, isPlay] = useState();
  const time = new Date().toISOString().slice(0, 10);
  return (
    <section className={classes.clockSection}>
      <header>
        <h1>Track your salary</h1>
        <h3>{time}</h3>
      </header>
      <Clock
        play={play}
        isPlay={isPlay}
        seconds={seconds}
        setSeconds={setSeconds}
      />
      <ShiftPayment
        setSeconds={setSeconds}
        isPlay={isPlay}
        play={play}
        seconds={seconds}
      />
    </section>
  );
}
export default NewShift;
