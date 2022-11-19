import classes from "./style/shiftPayment.module.css";
import { useEffect, useRef, useContext, useCallback } from "react";
import UserContext from "../../context/userContext.js";
import ShiftContext from "../../context/shiftContext.js";
import CurrentShiftContext from "../../context/currentShiftCtx.js";

function ShiftPayment({
  shiftDetails,
  seconds,

  setSeconds,
  setOpen,
}) {
  const { payment, currency, overTime } = useContext(UserContext);
  const { addShift } = useContext(ShiftContext);
  const { deleteShiftHandler, play, isPlay } = useContext(CurrentShiftContext);
  const currentPayment = useRef(0);

  const basicCalculate = useCallback(
    (sec) => {
      shiftDetails.current.basicPayment = ((sec / 60) * payment) / 60;

      currentPayment.current = shiftDetails.current.basicPayment;
      shiftDetails.current.totalProfit = currentPayment.current.toFixed(2);

      /*   localStorage.setItem(
        "shiftDetails",
        JSON.stringify(shiftDetails.current)
      ); */
    },
    [payment, shiftDetails]
  );
  // Calculation of pay
  const overTimeCalculate = useCallback(
    (sec) => {
      const EIGHT_HOURS_BY_MILLISECONDS = 28800;
      const TEN_HOURS_BY_MILLISECONDS = 36000;

      if (sec < EIGHT_HOURS_BY_MILLISECONDS) {
        shiftDetails.current.basicPayment = ((sec / 60) * payment) / 60;
      }

      // Calculation of pay for the first two overtime hours

      if (
        sec > EIGHT_HOURS_BY_MILLISECONDS &&
        sec < TEN_HOURS_BY_MILLISECONDS
      ) {
        shiftDetails.current.firstOverTimePay =
          (((sec - EIGHT_HOURS_BY_MILLISECONDS) / 60) * (payment * 1.25)) / 60;
      }

      //Calculation of the remaining overtime hours

      if (sec > TEN_HOURS_BY_MILLISECONDS) {
        shiftDetails.current.overTimePay =
          (((sec - TEN_HOURS_BY_MILLISECONDS) / 60) * (payment * 1.5)) / 60;
      }

      currentPayment.current =
        +shiftDetails.current.basicPayment +
        +shiftDetails.current.firstOverTimePay +
        +shiftDetails.current.overTimePay;

      shiftDetails.current.totalProfit = currentPayment.current.toFixed(2);
      /*   localStorage.setItem(
        "shiftDetails",
        JSON.stringify(shiftDetails.current)
      ); */
    },
    [payment, shiftDetails]
  );

  useEffect(() => {
    if (play) {
      !overTime ? basicCalculate(seconds) : overTimeCalculate(seconds);
    }
    if (play === null) {
      currentPayment.current = 0;
    }
  }, [
    seconds,
    shiftDetails,
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
      const shiftObj = { ...shiftDetails.current };
      addShift(shiftObj);
      deleteShiftHandler();
      setSeconds(0);
      setOpen(true);
      currentPayment.current = 0;
      localStorage.clear();
      return isPlay(null);
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
      {play && (
        <h3 className={classes.text}>
          Current Payment: {currentPayment.current.toFixed(2)}
          <span className={classes.currencyLabel}>{currency.label}</span>
        </h3>
      )}
      {play === false && (
        <button className={classes.save}>
          Save Shift {shiftDetails?.current?.totalProfit}
          <span className={classes.currencyLabel}>{currency.label}</span>
        </button>
      )}
      {play === null && (
        <h3 className={classes.text}>
          Current Payment: 0
          <span className={classes.currencyLabel}>{currency.label}</span>
        </h3>
      )}
    </div>
  );
}
export default ShiftPayment;
