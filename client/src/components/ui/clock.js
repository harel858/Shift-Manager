import classes from "./style/clock.module.css";
import "./style/rotateAnimation.css";
import { useContext } from "react";
import UseLongPress from "../Hooks/longPress.js";
import { BiPlay } from "react-icons/bi";
import { BsPause } from "react-icons/bs";
import Timer from "./timer";
import CurrentShiftContext from "../../context/currentShiftCtx";
import Zoom from "@mui/material/Zoom";

function Clock({
  shiftDetails,
  setSeconds,
  seconds,
  createNewShiftRef,
  checked,
}) {
  const {
    createCurrentShift,
    currentShift,
    updateShiftPaused,
    updateShiftStart,
    play,
    isPlay,
  } = useContext(CurrentShiftContext);

  const dependency = {
    shiftDetails,
    updateShiftPaused,
    updateShiftStart,
    play,
    isPlay,
    seconds,
    currentShift,
    createNewShiftRef,
    createCurrentShift,
  };

  const { handlers, isPressed } = UseLongPress({
    ...dependency,
  });

  const setClockId = () => {
    let id;
    if (play && isPressed) {
      id = "stoppingShift";
    }
    if (play === false && isPressed) {
      id = "continueShift";
    }
    if (play === null && isPressed) {
      id = "startShift";
    }
    return id;
  };
  const clockId = setClockId();

  return (
    <Zoom in={checked} style={{ transitionDelay: checked ? "400ms" : "0ms" }}>
      <div
        {...handlers}
        id={clockId}
        className={
          play
            ? classes.circlePlay
            : play === false
            ? classes.circleContinue
            : classes.circle
        }
      >
        <h2 className={classes.clockHeader}>
          {play
            ? "Hold To End"
            : play === false
            ? "Hold To Continue "
            : "Hold To Start"}
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
    </Zoom>
  );
}

export default Clock;
