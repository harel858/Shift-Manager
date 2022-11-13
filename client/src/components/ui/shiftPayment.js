import classes from "./style/shiftPayment.module.css";
import { useEffect, useRef, useContext, useCallback } from "react";
import UserContext from "../../context/userContext.js";
/* import ShiftContext from "../../context/shiftContext.js"; */
import CurrentShift from "../../context/currentShiftContext.js";

function ShiftPayment({
  shiftEarnings,
  seconds,
  play,
  isPlay,
  setSeconds,
  setOpen,
}) {
  const { deleteShift, currentShift } = useContext(CurrentShift);
  const { payment, currency, overTime } = useContext(UserContext);
  /* const { addShift } = useContext(ShiftContext); */
  const currentPayment = useRef(0);

  const basicCalculate = useCallback(
    (sec) => {
      shiftEarnings.current.basicPayment = ((sec / 60) * payment) / 60;

      currentPayment.current = shiftEarnings.current.basicPayment;
      shiftEarnings.current.totalProfit = currentPayment.current.toFixed(2);
    },
    [payment, shiftEarnings]
  );
  // Calculation of pay
  const overTimeCalculate = useCallback(
    (sec) => {
      const EIGHT_HOURS_BY_MILLISECONDS = 28800;
      const TEN_HOURS_BY_MILLISECONDS = 36000;

      if (sec < EIGHT_HOURS_BY_MILLISECONDS) {
        shiftEarnings.current.basicPayment = ((sec / 60) * payment) / 60;
      }

      // Calculation of pay for the first two overtime hours

      if (
        sec > EIGHT_HOURS_BY_MILLISECONDS &&
        sec < TEN_HOURS_BY_MILLISECONDS
      ) {
        shiftEarnings.current.firstOverTimePay =
          (((sec - EIGHT_HOURS_BY_MILLISECONDS) / 60) * (payment * 1.25)) / 60;
      }

      //Calculation of the remaining overtime hours

      if (sec > TEN_HOURS_BY_MILLISECONDS) {
        shiftEarnings.current.overTimePay =
          (((sec - TEN_HOURS_BY_MILLISECONDS) / 60) * (payment * 1.5)) / 60;
      }

      currentPayment.current =
        +shiftEarnings.current.basicPayment +
        +shiftEarnings.current.firstOverTimePay +
        +shiftEarnings.current.overTimePay;

      shiftEarnings.current.totalProfit = currentPayment.current.toFixed(2);
    },
    [payment, shiftEarnings]
  );

  useEffect(() => {
    if (play) {
      !overTime ? basicCalculate(seconds) : overTimeCalculate(seconds);
    } else if (play === null) {
      currentPayment.current = 0;
    }
  }, [
    seconds,
    shiftEarnings,
    play,
    basicCalculate,
    overTime,
    overTimeCalculate,
  ]);

  async function saveHandler() {
    const today = new Date();
    const currentDate = today.toLocaleString();
    try {
      shiftDetails.current.end = `${currentDate}`;
      localStorage.clear();
      const shiftObj = { ...shiftEarnings.current, ...currentShift };
      /* addShift(shiftObj); */
      setOpen(true);
      setSeconds(0);
      deleteShift(currentShift);
      return isPlay((play = null));
    } catch (err) {
      console.error(err);
    }
  }
  const totalProfit = shiftEarnings.current.totalProfit;
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
          Current Payment: {currentPayment.current.toFixed(2)}
          <span className={classes.currencyLabel}>{currency.label}</span>
        </h3>
      )}
      {ifPlay === false && (
        <button className={classes.save}>
          Save Shift {totalProfit}
          <span className={classes.currencyLabel}>{currency.label}</span>
        </button>
      )}
      {!localStorage.getItem("setPlay") && (
        <h3 className={classes.text}>
          Current Payment: 0
          <span className={classes.currencyLabel}>{currency.label}</span>
        </h3>
      )}
    </div>
  );
}
export default ShiftPayment;
