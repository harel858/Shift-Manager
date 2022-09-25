import classes from "./clock.module.css";
import { BiPlay } from "react-icons/bi";
import { BsPause } from "react-icons/bs";
import Timer from "./timer";

function Clock({ shiftDetails, setSeconds, seconds, play, isPlay }) {
  const today = new Date();
  const currentDateAndHour = today.toLocaleString();
  const currentDate = today.toISOString().slice(0, 10);

  function startToggleHandler() {
    if (seconds <= 0) {
      shiftDetails.current.start = `${currentDateAndHour} `;
      shiftDetails.current.date = `${currentDate}`;
      shiftDetails.current.startSeconds = today.getTime();
    }
    localStorage.setItem("setPlay", !play);
    return isPlay((prev) => !prev);
  }
  return (
    <>
      <div
        id="clock"
        onClick={startToggleHandler}
        className={
          play
            ? classes.circlePlay
            : play === false
            ? classes.circleContinue
            : classes.circle
        }
      >
        <h2 className={classes.clockHeader}>
          {play ? "End Shift" : play === false ? "continue " : "Start Shift"}
        </h2>

        {play ? (
          <BsPause className={classes.pause} />
        ) : (
          <BiPlay className={classes.play} />
        )}

        <Timer
          isPlay={isPlay}
          shiftDetails={shiftDetails}
          seconds={seconds}
          setSeconds={setSeconds}
          play={play}
        />
      </div>
    </>
  );
}

export default Clock;
