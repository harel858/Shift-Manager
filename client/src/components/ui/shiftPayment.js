import classes from "./style/shiftPayment.module.css";
import ShiftContext from "../../context/shiftContext";
import { useEffect, useRef, useContext, useCallback } from "react";

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
  const { payment, currency, overTime } = shiftCtx;

  const basicCalculate = useCallback(
    (sec) => {
      shiftDetails.current.basicPayment = ((sec / 60) * payment) / 60;
      currentPayment.current = shiftDetails.current.basicPayment;
      shiftDetails.current.totalProfit = currentPayment.current.toFixed(2);
      localStorage.setItem(
        "shiftDetails",
        JSON.stringify(shiftDetails.current)
      );
    },
    [payment, shiftDetails]
  );
  // Calculation of pay
  const overTimeCalculate = useCallback(
    (sec) => {
      if (sec < 28800) {
        shiftDetails.current.basicPayment = ((sec / 60) * payment) / 60;
      }

      // Calculation of pay for the first two overtime hours

      if (28800 < sec && sec < 36000) {
        shiftDetails.current.firstOverTimePay =
          (((sec - 28800) / 60) * (payment * 1.25)) / 60;
      }

      //Calculation of the remaining overtime hours

      if (sec > 36000) {
        shiftDetails.current.overTimePay =
          (((sec - 36000) / 60) * (payment * 1.5)) / 60;
      }

      currentPayment.current =
        +shiftDetails.current.basicPayment +
        +shiftDetails.current.firstOverTimePay +
        +shiftDetails.current.overTimePay;

      shiftDetails.current.totalProfit = currentPayment.current.toFixed(2);

      localStorage.setItem(
        "shiftDetails",
        JSON.stringify(shiftDetails.current)
      );
    },
    [payment, shiftDetails]
  );

  useEffect(() => {
    if (play) {
      !overTime ? basicCalculate(seconds) : overTimeCalculate(seconds);
    } else if (play === null) {
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
      localStorage.clear();
      const shiftObj = { ...shiftDetails.current };

      shiftCtx.addShift(shiftObj);
      setOpen(true);
      setSeconds(0);
      shiftDetails.current.basicPayment = 0;
      shiftDetails.current.firstOverTimePay = 0;
      shiftDetails.current.overTimePay = 0;
      shiftDetails.current.seconds = 0;
      shiftDetails.current.pausedSeconds = 0;
      shiftDetails.current.startAgain = 0;
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
