import classes from "./style/clock.module.css";
import { useEffect, useContext, useCallback } from "react";
import UserContext from "../../context/userContext.js";
function Timer({ shiftDetails, play, setSeconds, seconds, isPlay }) {
  const { payment, overTime } = useContext(UserContext);

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
      localStorage.setItem(
        "shiftDetails",
        JSON.stringify(shiftDetails?.current)
      );
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

    //Maintains playing status continuously
    if (localStorage.getItem("setPlay")) {
      let res = JSON.parse(localStorage.getItem("setPlay"));
      isPlay(res);
    }

    if (play === true) {
      interval = setInterval(() => {
        return setSeconds((prev) => prev + 1);
      }, 1000);
      shiftDetails.current.seconds = seconds;
    } else {
      const ifPlay = JSON.parse(localStorage.getItem("setPlay"));
      const currentShift = JSON.parse(localStorage.getItem("shiftDetails"));

      // while exit and playing
      if (ifPlay === true && !currentShift.pausedSeconds) {
        shiftDetails.current.seconds = currentTimeInSeconds - startSeconds;
        setSeconds(shiftDetails.current.seconds);
        setEarning(shiftDetails.current.seconds);
      }

      if (ifPlay === true && currentShift.pausedSeconds) {
        shiftDetails.current.seconds =
          currentTimeInSeconds -
          startSeconds -
          (currentShift.startAgain - currentShift.pausedSeconds);
        setSeconds(shiftDetails.current.seconds);
        setEarning(shiftDetails.current.seconds);
      }
      // while exit and pause
      if (ifPlay === false) {
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
