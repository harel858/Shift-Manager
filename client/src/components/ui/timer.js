import classes from "./style/clock.module.css";
import { useEffect, useContext, useCallback } from "react";
import UserContext from "../../context/userContext.js";
import CurrentShiftContext from "../../context/currentShiftCtx.js";

function Timer({ shiftDetails, play, setSeconds, seconds, isPlay }) {
  const { payment, overTime } = useContext(UserContext);
  const { currentShift } = useContext(CurrentShiftContext);

  const setEarning = useCallback(
    (sec) => {
      const EIGHT_HOURS_BY_MILLISECONDS = 28800;
      const TEN_HOURS_BY_MILLISECONDS = 36000;
      if (!overTime)
        return (shiftDetails.current.basicPayment =
          ((sec / 60) * payment) / 60);

      if (sec > EIGHT_HOURS_BY_MILLISECONDS) {
        shiftDetails.current.basicPayment =
          ((EIGHT_HOURS_BY_MILLISECONDS / 60) * payment) / 60;
      }
      if (sec < EIGHT_HOURS_BY_MILLISECONDS) {
        shiftDetails.current.basicPayment = ((sec / 60) * payment) / 60;
      }
      if (sec > TEN_HOURS_BY_MILLISECONDS) {
        shiftDetails.current.firstOverTimePay =
          (((TEN_HOURS_BY_MILLISECONDS - EIGHT_HOURS_BY_MILLISECONDS) / 60) *
            (payment * 1.25)) /
          60;
      }
      if (
        sec < TEN_HOURS_BY_MILLISECONDS &&
        sec > EIGHT_HOURS_BY_MILLISECONDS
      ) {
        shiftDetails.current.firstOverTimePay =
          (((sec - EIGHT_HOURS_BY_MILLISECONDS) / 60) * (payment * 1.25)) / 60;
      }
      if (sec > TEN_HOURS_BY_MILLISECONDS) {
        shiftDetails.current.overTimePay =
          (((sec - TEN_HOURS_BY_MILLISECONDS) / 60) * (payment * 1.5)) / 60;
      }
    },
    [shiftDetails, payment, overTime]
  );
  //global variables
  let today = new Date();
  let currentTime = today.getTime();
  let currentTimeInSeconds = Math.floor(currentTime / 1000);
  let startSeconds = shiftDetails.current.startSeconds;
  startSeconds = Math.floor(startSeconds / 1000);

  let hrs = 0;
  let mins = 0;
  let secs = 0;

  //update the timer
  useEffect(() => {
    let interval = null;

    // while exit and playing
    if (play === true && shiftDetails.current.pausedSeconds === 0) {
      let secs = currentTimeInSeconds - startSeconds;
      setSeconds(secs);
      setEarning(secs);
    }

    // while exit and playing but has been stopped
    if (play === true && shiftDetails.current.startAgain > 0) {
      let secs =
        currentTimeInSeconds -
        startSeconds -
        (shiftDetails.current.startAgain - shiftDetails.current.pausedSeconds);
      setSeconds(secs);
      setEarning(secs);
    }

    //while playing
    if (play === true) {
      interval = setInterval(() => {
        return setSeconds((prev) => prev + 1);
      }, 1000);
      shiftDetails.current.seconds = seconds;
    } else {
      // while exit and pause
      if (play === false) {
        setSeconds(shiftDetails.current.seconds);
        setEarning(shiftDetails.current.seconds);
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
    shiftDetails,
    startSeconds,
    setEarning,
    currentShift,
  ]);

  hrs = Math.floor(seconds / 3600);
  mins = Math.floor((seconds - hrs * 3600) / 60);
  secs = seconds % 60;

  hrs = (`0` + hrs).slice(-2);
  mins = (`0` + mins).slice(-2);
  secs = (`0` + secs).slice(-2);
  shiftDetails.current.timeSpend = `${hrs}:${mins}:${secs}`;

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
