import { useRef } from "react";

export default function UseLongPress({
  shiftDetails,
  updateShiftPaused,
  updateShiftStart,
  play,
  isPlay,
  seconds,
  currentShift,
  createNewShiftRef,
  createCurrentShift,
}) {
  const timeRef = useRef();

  function startToggleHandler() {
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
    console.log("onMouseUp");
  };
  const onMouseDown = () => {
    startPressTimer();
    console.log("onMouseDown");
  };
  const onTouchStart = () => {
    startPressTimer();
    console.log("onTouchStart");
  };
  const onTouchEnd = () => {
    console.log("onTouchEnd");
    clearTimeout(timeRef.current);
  };

  function startPressTimer() {
    timeRef.current = setTimeout(() => {
      startToggleHandler();
    }, 2000);
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
