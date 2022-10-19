import classes from "./style/clock.module.css";
import { BiPlay } from "react-icons/bi";
import { BsPause } from "react-icons/bs";
import Timer from "./timer";

function Clock({ shiftDetails, setSeconds, seconds, play, isPlay }) {
  const startToggleHandler = () => {
    if (seconds === 0) {
      const today = new Date();
      const currentDateAndHour = today.toLocaleString();
      console.log(currentDateAndHour);
      const currentDate = today.toLocaleString("default", { month: "long" });
      shiftDetails.current.start = `${currentDateAndHour} `;
      shiftDetails.current.date = `${currentDate}`;
      shiftDetails.current.startSeconds = today.getTime();
      console.log(shiftDetails);
    }
    console.log(shiftDetails);
    localStorage.setItem("setPlay", !play);
    return isPlay((prev) => !prev);
  };
  console.log(shiftDetails.current);
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
