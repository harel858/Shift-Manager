import classes from "./style/clock.module.css";
import { useContext } from "react";
import { BiPlay } from "react-icons/bi";
import { BsPause } from "react-icons/bs";
import Timer from "./timer";
import CurrentShift from "../../context/currentShiftContext.js";

function Clock({ shiftDetails, setSeconds, seconds, play, isPlay }) {
  const { createCurrentShift, updatePaused, updateStartAgain, currentShift } =
    useContext(CurrentShift);
  console.log(currentShift);

  const startToggleHandler = () => {
    if (!play && !currentShift) {
      const today = new Date();
      const currentDateAndHour = today.toLocaleString();
      const currentDate = today.toLocaleString("en-US", { month: "long" });
      createCurrentShift(
        user.workPlaces[0],
        `${currentDateAndHour} `,
        `${currentDate}`,
        today.getTime(),
        0,
        0
      );
    }
    if (play && currentShift) {
      const nowInSeconds = new Date().getTime();
      updatePaused(Math.floor(nowInSeconds / 1000));
    }

    if (!play && currentShift) {
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
