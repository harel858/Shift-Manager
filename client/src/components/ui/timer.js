import classes from "./clock.module.css";
import { useEffect } from "react";
function Timer({ play, setSeconds, seconds }) {
  //global variables

  let hrs = 0;
  let mins = 0;
  let secs = 0;

  //update the timer
  useEffect(() => {
    let interval = null;

    if (play) {
      interval = setInterval(() => {
        return setSeconds((prev) => (seconds = prev + 1));
      }, 1000);
    } else {
      clearInterval(interval);
      interval = null;
    }
    return () => clearInterval(interval);
  }, [play]);
  hrs = Math.floor(seconds / 3600);
  mins = Math.floor((seconds - hrs * 3600) / 60);
  secs = seconds % 60;

  return (
    <>
      <h6 id="time" className={classes.stopWatch}>
        <span>{(`0` + hrs).slice(-2)}:</span>
        <span>{(`0` + mins).slice(-2)}:</span>
        <span>{(`0` + secs).slice(-2)}</span>
      </h6>
    </>
  );
}
export default Timer;
