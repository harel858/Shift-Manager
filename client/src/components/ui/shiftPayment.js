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
  const shiftCtx = useContext(ShiftContext);
  const currentPayment = useRef(0);

  useEffect(() => {
    // Calculation of pay
    if (play) {
      if (seconds < 28800) {
        shiftDetails.current.basicPayment = ((seconds / 60) * 40) / 60;
      }

      // Calculation of pay for the first two overtime hours

      if (28800 < seconds && seconds < 36000) {
        shiftDetails.current.firstOverTimePay =
          (((seconds - 28800) / 60) * (40 * 1.25)) / 60;
      }

      //Calculation of the remaining overtime hours

      if (seconds > 36000) {
        shiftDetails.current.overTimePay =
          (((seconds - 36000) / 60) * (40 * 1.5)) / 60;
      }

      currentPayment.current =
        +shiftDetails.current.basicPayment +
        +shiftDetails.current.firstOverTimePay +
        +shiftDetails.current.overTimePay;

      shiftDetails.current.totalProfit = currentPayment.current.toFixed(2);
      console.log(shiftDetails);
      localStorage.setItem(
        "shiftDetails",
        JSON.stringify(shiftDetails.current)
      );
    } else if (play === null) {
      currentPayment.current = 0;
    }
  }, [seconds, shiftDetails, play]);

  async function saveHandler() {
    const today = new Date();
    const currentDate = today.toLocaleString();
    try {
      shiftDetails.current.end = `${currentDate}`;
      localStorage.clear();
      const shiftObj = { ...shiftDetails.current };
      console.log(shiftObj);

      shiftCtx.addShift(shiftObj);
      setOpen(true);
      setSeconds(0);
      shiftDetails.current.basicPayment = null;
      shiftDetails.current.firstOverTimePay = null;
      shiftDetails.current.overTimePay = null;
      shiftDetails.current.seconds = 0;
      return isPlay((play = null));
    } catch (err) {
      console.error(err);
    }
  }
  const totalProfit = shiftDetails.current.totalProfit;
  const ifPlay = JSON.parse(localStorage.getItem("setPlay"));
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
      {ifPlay && (
        <h3 className={classes.text}>
          Current Payment: {currentPayment.current.toFixed(2)}$
        </h3>
      )}
      {ifPlay === false && (
        <button className={classes.save}>Save Shift {totalProfit}$</button>
      )}
      {!localStorage.getItem("setPlay") && (
        <h3 className={classes.text}>Current Payment: 0$</h3>
      )}
    </div>
  );
}
export default ShiftPayment;
