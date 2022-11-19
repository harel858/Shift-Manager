import classes from "./style/clock.module.css";
import { BiPlay } from "react-icons/bi";
import { BsPause } from "react-icons/bs";
import Timer from "./timer";
import { useContext } from "react";
import CurrentShiftContext from "../../context/currentShiftCtx";

function Clock({ shiftDetails, setSeconds, seconds, createNewShiftRef }) {
  const {
    createCurrentShift,
    currentShift,
    updateShiftPaused,
    updateShiftStart,
    play,
    isPlay,
  } = useContext(CurrentShiftContext);

  const startToggleHandler = () => {
    if (!play && seconds <= 0 && !currentShift) {
      createNewShiftRef();
      createCurrentShift(shiftDetails.current);
    }

    if (play && seconds > 0) {
      shiftDetails.current.seconds = seconds;
      const nowInSeconds = new Date().getTime();
      shiftDetails.current.pausedSeconds =
        shiftDetails.current.pausedSeconds + Math.floor(nowInSeconds / 1000);
      updateShiftPaused(shiftDetails.current);
    }

    if (!play && seconds > 0) {
      const nowInSeconds = new Date().getTime();
      shiftDetails.current.startAgain =
        shiftDetails.current.startAgain + Math.floor(nowInSeconds / 1000);
      updateShiftStart(shiftDetails.current);
    }

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
