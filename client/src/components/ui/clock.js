import classes from "./style/clock.module.css";
import { useContext } from "react";
import { BiPlay } from "react-icons/bi";
import { BsPause } from "react-icons/bs";
import Timer from "./timer";
import CurrentShift from "../../context/currentShiftContext.js";
import UserContext from "../../context/userContext.js";

function Clock({ shiftEarnings, setSeconds, seconds, play, isPlay }) {
  const { createCurrentShift, updatePaused, updateStartAgain, currentShift } =
    useContext(CurrentShift);
  const { user } = useContext(UserContext);
  //Maintains playing status continuously
  if (currentShift) {
    let res = currentShift.play;
    isPlay(res);
  }

  const startToggleHandler = () => {
    isPlay((prev) => !prev);
    const today = new Date();

    //start
    if (!play && !currentShift) {
      const currentDateAndHour = today.toLocaleString();
      const currentDate = today.toLocaleString("en-US", { month: "long" });

      return createCurrentShift(
        user.workPlaces[0],
        `${currentDateAndHour} `,
        `${currentDate}`,
        today.getTime(),
        0,
        0
      );
    }
    //paused
    if (play && currentShift) {
      return updatePaused(Math.floor(today.getTime() / 1000));
    }
    //continue
    if (!play && currentShift) {
      return updateStartAgain(Math.floor(today.getTime() / 1000));
    }
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
          shiftEarnings={shiftEarnings}
          currentShift={currentShift}
          isPlay={isPlay}
          seconds={seconds}
          setSeconds={setSeconds}
          play={play}
        />
      </div>
    </>
  );
}

export default Clock;
