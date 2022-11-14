import classes from "./style/clock.module.css";
import { useEffect, useContext, useCallback } from "react";
import UserContext from "../../context/userContext.js";
function Timer({
  shiftEarnings,
  currentShift,
  play,
  setSeconds,
  seconds,
  isPlay,
}) {
  const { payment } = useContext(UserContext);

  const setEarning = useCallback(
    (sec) => {
      const EIGHT_HOURS_BY_MILLISECONDS = 28800;
      const TEN_HOURS_BY_MILLISECONDS = 36000;
      let basicPayment = 0;
      let firstOverTimePay = 0;
      let overTimePay = 0;
      if (sec > EIGHT_HOURS_BY_MILLISECONDS) {
        basicPayment = ((EIGHT_HOURS_BY_MILLISECONDS / 60) * payment) / 60;
      }
      if (sec > TEN_HOURS_BY_MILLISECONDS) {
        firstOverTimePay =
          (((TEN_HOURS_BY_MILLISECONDS - EIGHT_HOURS_BY_MILLISECONDS) / 60) *
            (payment * 1.25)) /
          60;
      }
      if (sec > TEN_HOURS_BY_MILLISECONDS) {
        overTimePay =
          (((sec - TEN_HOURS_BY_MILLISECONDS) / 60) * (payment * 1.5)) / 60;
      }
      shiftEarnings.current.basicPayment = basicPayment.toFixed(2);
      shiftEarnings.current.firstOverTimePay = firstOverTimePay.toFixed(2);
      shiftEarnings.current.overTimePay = overTimePay.toFixed(2);
      shiftEarnings.current.totalProfit =
        basicPayment + firstOverTimePay + overTimePay;
    },
    [shiftEarnings, payment]
  );
  //global variables
  let today = new Date();
  let currentTime = today.getTime();
  let currentTimeInSeconds = Math.floor(currentTime / 1000);
  let startSeconds = currentShift?.startSeconds;
  startSeconds = Math.floor(startSeconds / 1000);

  let hrs = 0;
  let mins = 0;
  let secs = 0;

  //update the timer
  useEffect(() => {
    let interval = null;
    //Maintains playing status continuously
    if (currentShift) {
      let res = currentShift.play;
      isPlay(res);
    }
    if (play === true) {
      interval = setInterval(() => {
        return setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      // while exit and playing
      if (play === true && !currentShift?.pausedSeconds) {
        setSeconds(currentTimeInSeconds - startSeconds);
        setEarning(currentTimeInSeconds - startSeconds);
      }

      if (play === true && currentShift?.pausedSeconds) {
        setSeconds(
          currentTimeInSeconds -
            startSeconds -
            (currentShift.startAgain - currentShift?.pausedSeconds)
        );
        setEarning(
          currentTimeInSeconds -
            startSeconds -
            (currentShift.startAgain - currentShift?.pausedSeconds)
        );
      }
      // while exit and pause
      if (play === false) {
        currentShift?.startAgain &&
          setSeconds(currentShift?.startAgain - currentShift?.pausedSeconds);
        setEarning(currentShift?.startAgain - currentShift?.pausedSeconds);
      }

      // while exit and not playing
      !currentShift && setSeconds(0);

      clearInterval(interval);
      interval = null;
    }
    return () => clearInterval(interval);
  }, [
    play,
    seconds,
    isPlay,
    setSeconds,
    currentTimeInSeconds,
    currentShift,
    startSeconds,
    setEarning,
  ]);

  hrs = Math.floor(seconds / 3600);
  mins = Math.floor((seconds - hrs * 3600) / 60);
  secs = seconds % 60;

  hrs = (`0` + hrs).slice(-2);
  mins = (`0` + mins).slice(-2);
  secs = (`0` + secs).slice(-2);
  shiftEarnings.current.timeSpend = `${hrs}:${mins}:${secs}`;

  return (
    <>
      <h6 id="time" className={classes.stopWatch}>
        <span>{hrs}:</span>
        <span>{mins}:</span>
        <span>{secs}</span>
      </h6>
    </>
  );
}
export default Timer;
