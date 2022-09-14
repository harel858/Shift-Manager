import classes from "./shiftPayment.module.css";
import { useEffect, useRef } from "react";
function ShiftPayment({ seconds, play, isPlay, setSeconds }) {
  let currentPayment = useRef(0);

  useEffect(() => {
    if (play) {
      currentPayment.current = ((seconds / 60) * 40) / 60;
    } else if (play !== true) {
      currentPayment.current = 0;
    }
  }, [seconds, play]);
  function saveHandler() {
    isPlay((play = undefined));
    setSeconds((seconds = 0));
    currentPayment.current = 0;
  }
  play
    ? console.log("play")
    : play === false
    ? console.log("false")
    : console.log("else");
  return (
    <div
      className={
        play
          ? classes.containerPlay
          : play === false
          ? classes.containerSave
          : classes.container
      }
      onClick={play === false ? saveHandler : null}
    >
      {play ? (
        <h3 className={classes.text}>
          Current Payment: {currentPayment.current.toFixed(2)}$
        </h3>
      ) : play === false ? (
        <button className={classes.save}>
          save Shift with {currentPayment.current.toFixed(2)}$
        </button>
      ) : (
        <h3 className={classes.text}>
          Current Payment: {currentPayment.current.toFixed(2)}$
        </h3>
      )}
    </div>
  );
}
export default ShiftPayment;
