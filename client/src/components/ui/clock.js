import classes from "./clock.module.css";
import { BiPlay } from "react-icons/bi";
import { BsPause } from "react-icons/bs";
import Timer from "./timer";

function Clock({ shiftDetails, setSeconds, seconds, play, isPlay }) {
  const today = new Date();
  const currentDate = today.toISOString().slice(0, 10);
  const currentTimeOclock =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  function startToggleHandler() {
    console.log(shiftDetails.current);
    if (seconds <= 0) {
      shiftDetails.current.start = `${currentDate} || ${currentTimeOclock}`;
      shiftDetails.current.date = `${currentDate}`;
    }
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
            : play == false
            ? classes.circleContinue
            : classes.circle
        }
      >
        <h2 className={classes.clockHeader}>
          {play ? "End Shift" : play == false ? "continue " : "Start Shift"}
        </h2>

        {play ? (
          <BsPause className={classes.pause} />
        ) : (
          <BiPlay className={classes.play} />
        )}

        <Timer
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
