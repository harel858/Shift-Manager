import classes from "./shiftPayment.module.css";
import ShiftContext from "../../context/shiftContext";
import { useEffect, useRef, useContext } from "react";

function ShiftPayment({
  shiftDetails,
  seconds,
  play,
  isPlay,
  setSeconds,
  setOpen,
}) {
  const today = new Date();
  const currentDate = today.toLocaleString();
  const shiftCtx = useContext(ShiftContext);
  const currentPayment = useRef(0);

  useEffect(() => {
    if (play) {
      currentPayment.current = ((seconds / 60) * 40) / 60;
    } else if (play === null) {
      currentPayment.current = 0;
    }
  }, [seconds, play]);

  async function saveHandler() {
    try {
      shiftDetails.current.end = `${currentDate}`;
      shiftDetails.current.totalProfit = `${currentPayment.current.toFixed(2)}`;
      shiftDetails.current.seconds = localStorage.getItem("seconds");
      const newObj = { ...shiftDetails.current };
      console.log(newObj);
      shiftCtx.addShift(newObj);
      setOpen(true);
      setSeconds((seconds = 0));
      currentPayment.current = 0;
      localStorage.removeItem("shiftDetails");
      localStorage.removeItem("setPlay");
      return isPlay((play = null));
    } catch (err) {
      console.error(err);
    }
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
