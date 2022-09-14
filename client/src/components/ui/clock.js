import classes from "./clock.module.css";
import { BiPlay } from "react-icons/bi";
import { BsPause } from "react-icons/bs";
import { useState } from "react";
import Timer from "./timer";

function Clock({ setSeconds, seconds, play, isPlay }) {
  const [iconBtn, setIconBtn] = useState(<BiPlay className={classes.play} />);
  function playHandler(e) {
    if (!play) {
      isPlay(true);
      setIconBtn(<BsPause className={classes.pause} />);
    } else {
      isPlay(false);
      setIconBtn(<BiPlay className={classes.play} />);
    }
  }

  return (
    <>
      <div
        id="clock"
        onClick={playHandler}
        className={
          play
            ? classes.circlePlay
            : play == false
            ? classes.circleContinue
            : classes.circle
        }
      >
        <h2 className={classes.clockHeader}>
          {play ? "End Shift" : play == false ? "continue " : "Start Shift"}
        </h2>

        {iconBtn}

        <Timer seconds={seconds} setSeconds={setSeconds} play={play} />
      </div>
    </>
  );
}

export default Clock;
