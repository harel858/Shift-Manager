import { useState, useContext, createContext, useEffect } from "react";
import UserContext from "./userContext.js";
const ShiftContext = createContext({
  shifts: [],
  totalShifts: 0,
  error: String,
  addShift: (shift) => {},
  deleteShift: (shiftId) => {},
  loadingShift: Boolean,
  updateShift: (
    index,
    _id,
    start,
    end,
    timeSpend,
    totalProfit,
    basicPayment,
    firstOverTime,
    overTime,
    seconds,
    date
  ) => {},
});

export function ShiftContextProvider(props) {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [shiftList, setShiftList] = useState([]);

  const { setLoginError } = useContext(UserContext);

  useEffect(() => {
    let allShifts = [];
    setLoading(true);
    const getShiftData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_KEY}/shifts`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const shifts = await res.json();
          allShifts.push(...shifts);
        } else {
          const resError = await res.json();
          setLoginError(resError);
        }
      } catch (err) {
        setShiftList(allShifts);
        throw err;
      } finally {
        setShiftList(allShifts);
        setLoading(false);
      }
    };
    getShiftData();
  }, [user, setUser, setLoginError]);

  async function addShiftHandler(shift) {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_KEY}/shifts/create`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            workPlace: shift.workPlace,
            start: shift.start,
            end: shift.end,
            date: shift.date,
            timeSpend: shift.timeSpend,
            totalProfit: shift.totalProfit,
            seconds: shift.seconds,
            basicPayment: shift.basicPayment,
            firstOverTime: shift.firstOverTimePay,
            overTime: shift.overTimePay,
          }),
        }
      );

      if (res.ok) {
        const newShift = await res.json();
        setShiftList((prev) => [...prev, newShift]);
      } else {
        const response = await res.json();
        throw response;
      }
    } catch (err) {
      console.error(err);
    }
  }

  const deleteShiftHandler = async (shift) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_KEY}/shifts/delete`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: shift._id,
          }),
        }
      );

      if (res.ok) {
        setShiftList((prev) => {
          return prev.filter((newListShift) => newListShift._id !== shift._id);
        });
      } else {
        throw await res.json();
      }
    } catch (err) {
      throw err;
    }
  };
  const updateShiftHandler = async (
    index,
    _id,
    workPlace,
    start,
    end,
    timeSpend,
    totalProfit,
    basicPayment,
    firstOverTime,
    overTime,
    seconds,
    date
  ) => {
    try {
      let res = await fetch(`${process.env.REACT_APP_API_KEY}/shifts/update`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id,
          start,
          end,
          date,
          timeSpend,
          basicPayment,
          firstOverTime,
          overTime,
          totalProfit,
          seconds,
        }),
      });
      if (res.ok) {
        const response = await res.json();
        let [updatedShift] = response;
        setShiftList((prev) => {
          prev[index] = updatedShift;
          return [...prev];
        });
      } else {
        throw await res.json();
      }
    } catch (err) {
      throw err;
    }
  };

  const context = {
    shifts: shiftList,
    totalShifts: shiftList.length,
    addShift: addShiftHandler,
    deleteShift: deleteShiftHandler,
    updateShift: updateShiftHandler,
    loadingShift: loading,
  };

  return (
    <ShiftContext.Provider value={context}>
      {props.children}
    </ShiftContext.Provider>
  );
}
export default ShiftContext;
