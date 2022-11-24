import { useRef, useState } from "react";

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
  const [isPressed, setIsPressed] = useState(false);
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
    setIsPressed(false);

    return isPlay((prev) => !prev);
  }

  const onMouseUp = () => {
    clearTimeout(timeRef.current);
    setIsPressed(false);
  };
  const onMouseDown = () => {
    startPressTimer();
  };
  const onTouchStart = () => {
    startPressTimer();
  };
  const onTouchEnd = () => {
    clearTimeout(timeRef.current);
    setIsPressed(false);
  };

  function startPressTimer() {
    setIsPressed(true);
    timeRef.current = setTimeout(() => {
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
    isPressed,
  };
}
