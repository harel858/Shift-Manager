import classes from "./clock.module.css";
import { useEffect } from "react";
function Timer({ shiftDetails, play, setSeconds, seconds, isPlay }) {
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
    if (localStorage.getItem("setPlay")) {
      let res = JSON.parse(localStorage.getItem("setPlay"));
      setSeconds(currentTimeInSeconds - startSeconds);
      isPlay(res);
    }

    if (play) {
      interval = setInterval(() => {
        return setSeconds((prev) => prev + 1);
      }, 1000);
      localStorage.setItem("seconds", seconds);
    } else {
      clearInterval(interval);
      interval = null;
    }
    return () => clearInterval(interval);
  }, [play, seconds, setSeconds, isPlay, currentTimeInSeconds, startSeconds]);

  hrs = Math.floor(seconds / 3600);
  mins = Math.floor((seconds - hrs * 3600) / 60);
  secs = seconds % 60;

  hrs = (`0` + hrs).slice(-2);
  mins = (`0` + mins).slice(-2);
  secs = (`0` + secs).slice(-2);
  if (seconds > 0) {
    shiftDetails.current.timeSpending = `${hrs}:${mins}:${secs}`;
    localStorage.setItem("shiftDetails", JSON.stringify(shiftDetails.current));
  }

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
