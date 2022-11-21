import classes from "./style/clock.module.css";
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

  const { handlers } = UseLongPress({ ...dependency });

  return (
    <Zoom in={checked} style={{ transitionDelay: checked ? "400ms" : "0ms" }}>
      <div
        {...handlers}
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
    </Zoom>
  );
}

export default Clock;
