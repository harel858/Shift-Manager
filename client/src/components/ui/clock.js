import classes from "./style/clock.module.css";
import { useContext, useRef } from "react";
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
  const clockRef = useRef();

  const { handlers } = UseLongPress({ ...dependency }, clockRef.current);

  return (
    <Zoom in={checked} style={{ transitionDelay: checked ? "400ms" : "0ms" }}>
      <div
        {...handlers}
        ref={clockRef}
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
