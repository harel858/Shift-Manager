import classes from "./shiftPayment.module.css";
import ShiftContext from "../../context/shiftContext";
import { useEffect, useRef, useContext } from "react";
function ShiftPayment({ shiftDetails, seconds, play, isPlay, setSeconds }) {
  const today = new Date();
  const currentDate = today.toISOString().slice(0, 10);
  const currentTimeOclock =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const shiftCtx = useContext(ShiftContext);
  const currentPayment = useRef(0);

  useEffect(() => {
    if (play) {
      currentPayment.current = ((seconds / 60) * 40) / 60;
    } else if (play === null) {
      currentPayment.current = 0;
    }
  }, [seconds, play]);

  function saveHandler() {
    shiftDetails.current.end = `${currentDate} || ${currentTimeOclock}`;
    shiftDetails.current.totalProfit = `${currentPayment.current.toFixed(2)}$`;
    const newObj = { ...shiftDetails.current };
    shiftCtx.addShift(newObj);
    setSeconds((seconds = 0));
    currentPayment.current = 0;
    shiftDetails.current = {
      start: null,
      end: null,
      date: null,
      timeSpending: null,
      totalProfit: null,
    };
    return isPlay((play = null));
  }
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
          Save Shift {currentPayment.current.toFixed(2)}$
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
