import { useRef } from "react";

export default function UseLongPress(
  {
    shiftDetails,
    updateShiftPaused,
    updateShiftStart,
    play,
    isPlay,
    seconds,
    currentShift,
    createNewShiftRef,
    createCurrentShift,
  },
  clockRef
) {
  const timeRef = useRef();

  function startToggleHandler() {
    clockRef.id = "";
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
  }

  const onMouseUp = () => {
    clearTimeout(timeRef.current);
    clockRef.id = "";
  };
  const onMouseDown = () => {
    startPressTimer();
  };
  const onTouchStart = () => {
    startPressTimer();
  };
  const onTouchEnd = () => {
    clearTimeout(timeRef.current);
    clockRef.id = "";
  };

  function startPressTimer() {
    if (clockRef.className === "clock_circleContinue__+FTJ4") {
      clockRef.id = "continueShift";
    }
    if (clockRef.className === "clock_circle__dIn9H") {
      clockRef.id = "startShift";
    }
    if (clockRef.className === "clock_circlePlay__t30qY") {
      clockRef.id = "stoppingShift";
    }
    timeRef.current = setTimeout(() => {
      clockRef.id = "";
      startToggleHandler();
    }, 4000);
  }

  return {
    handlers: {
      onMouseUp,
      onMouseDown,
      onTouchStart,
      onTouchEnd,
    },
  };
}
