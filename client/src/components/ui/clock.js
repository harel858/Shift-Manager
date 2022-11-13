import classes from "./style/clock.module.css";
import { useContext } from "react";
import { BiPlay } from "react-icons/bi";
import { BsPause } from "react-icons/bs";
import Timer from "./timer";
import CurrentShift from "../../context/currentShiftContext.js";

function Clock({ shiftDetails, setSeconds, seconds, play, isPlay }) {
  const { updatePaused, updateStartAgain } = useContext(CurrentShift);
  const startToggleHandler = () => {
    if (play && seconds > 0) {
      const nowInSeconds = new Date().getTime();
      updatePaused(Math.floor(nowInSeconds / 1000));
    }

    if (!play && seconds > 0) {
      const nowInSeconds = new Date().getTime();
      updateStartAgain(Math.floor(nowInSeconds / 1000));
    }

    localStorage.setItem("setPlay", !play);
    return isPlay((prev) => !prev);
  };

  return (
    <>
      <div
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
