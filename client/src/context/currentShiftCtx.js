import { useState, createContext, useEffect, useContext } from "react";
import UserContext from "./userContext.js";
const CurrentShiftContext = createContext({
  currentShift: {},
  createCurrentShift: (shift) => {},
  updateShiftPaused: (
    pausedSeconds,
    timeSpend,
    seconds,
    totalProfit,
    basicPayment,
    firstOverTimePay,
    overTimePay
  ) => {},
  updateShiftStart: (startSeconds) => {},
  deleteShiftHandler: () => {},
  error: String,
  loading: Boolean,
  play: Boolean,
  isPlay: () => {},
});

export function CurrentShiftContextProvider(props) {
  const { user } = useContext(UserContext);
  const [currentShift, setCurrentShift] = useState();
  const [loadingShift, setLoadingShift] = useState(false);
  const [shiftError, setShiftError] = useState("");
  const [play, isPlay] = useState(null);

  useEffect(() => {
    setLoadingShift(true);
    const getShiftData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_KEY}/currentShift`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res.ok) {
          const [shift] = await res.json();

          setCurrentShift(shift);
          isPlay(shift.isRunning);
        } else {
          const resError = await res.json();
          console.log(resError);
          setShiftError(resError);
        }
      } catch (err) {
        throw err;
      } finally {
        setLoadingShift(false);
      }
    };
    getShiftData();
  }, [user]);

  async function createCurrentShift(shift) {
    setLoadingShift(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_KEY}/currentShift/create`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            start: shift.start,
            date: shift.date,
            startSeconds: shift.startSeconds,
            pausedSeconds: shift.pausedSeconds,
            startAgain: shift.startAgain,
            timeSpend: shift.timeSpend,
            totalProfit: shift.totalProfit,
            seconds: shift.seconds,
            basicPayment: shift.basicPayment,
            firstOverTimePay: shift.firstOverTimePay,
            overTimePay: shift.overTimePay,
          }),
        }
      );

      if (res.ok) {
        const newShift = await res.json();

        setCurrentShift(newShift);
      } else {
        const response = await res.json();
        throw response;
      }
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoadingShift(false);
    }
  }

  const updateShiftPaused = async (shift) => {
    setLoadingShift(true);
    try {
      const {
        pausedSeconds,
        timeSpend,
        seconds,
        totalProfit,
        basicPayment,
        firstOverTimePay,
        overTimePay,
      } = shift;

      let res = await fetch(
        `${process.env.REACT_APP_API_KEY}/currentShift/update-paused`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pausedSeconds,
            timeSpend,
            seconds,
            totalProfit,
            basicPayment,
            firstOverTimePay,
            overTimePay,
          }),
        }
      );
      if (res.ok) {
        const response = await res.json();

        let [updatedShift] = response;
        setCurrentShift(updatedShift);
      } else {
        throw await res.json();
      }
    } catch (err) {
      throw err;
    } finally {
      setLoadingShift(false);
    }
  };

  const updateShiftStart = async (shift) => {
    setLoadingShift(true);
    const { startAgain } = shift;
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_KEY}/currentShift/update-start`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            startAgain,
          }),
        }
      );
      if (res.ok) {
        const response = await res.json();
        let [updatedShift] = response;
        setCurrentShift(updatedShift);
      } else {
        throw await res.json();
      }
    } catch (err) {
      throw err;
    } finally {
      setLoadingShift(false);
    }
  };

  const deleteShiftHandler = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_KEY}/currentShift/delete`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.ok) {
        setCurrentShift(null);
      } else {
        throw await res.json();
      }
    } catch (err) {
      throw err;
    }
  };

  const context = {
    currentShift,
    loadingShift,
    shiftError,
    createCurrentShift,
    updateShiftPaused,
    updateShiftStart,
    deleteShiftHandler,
    play,
    isPlay,
  };
  return (
    <CurrentShiftContext.Provider value={context}>
      {props.children}
    </CurrentShiftContext.Provider>
  );
}
export default CurrentShiftContext;
