import { useState, createContext, useEffect } from "react";

const ShiftContext = createContext({
  shifts: [],
  totalShifts: 0,
  error: String,
  addShift: (shift) => {},
  deleteShift: (shiftId) => {},
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
    date,
    setEditor
  ) => {},
  payment: Number,
  setPayment: (payment) => {},
  currency: String,
  overTime: Boolean,
});

export function ShiftContextProvider(props) {
  const [shiftList, setShiftList] = useState([]);
  const [error, setError] = useState(null);
  const [payment, setPayment] = useState(29.17);
  const [currency, setCurrency] = useState("Dollar$");
  const [overTime, setOvertime] = useState(true);

  useEffect(() => {
    let allShifts = [];

    const getData = async () => {
      try {
        const res = await fetch("http://localhost:5000/shifts", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const shifts = await res.json();

          allShifts.push(...shifts);
        } else {
          const badRes = await res.json();
          setError(badRes);
        }
      } catch (err) {
        throw err;
      }
      setShiftList(allShifts);
    };

    getData();
  }, []);

  async function addShiftHandler(shift) {
    try {
      const res = await fetch("http://localhost:5000/shifts/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
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
      });

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
      const res = await fetch("http://localhost:5000/shifts/delete", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: shift._id,
        }),
      });

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
    start,
    end,
    timeSpend,
    totalProfit,
    basicPayment,
    firstOverTime,
    overTime,
    seconds,
    date,
    setEditor
  ) => {
    try {
      console.log(0);
      let res = await fetch("http://localhost:5000/shifts/update", {
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
        console.log(updatedShift);
        setShiftList((prev) => {
          prev[index] = updatedShift;
          return [...prev];
        });
        setEditor((prev) => !prev);
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
    error,
    payment,
    currency,
    overTime,
    setPayment,
  };

  return (
    <ShiftContext.Provider value={context}>
      {props.children}
    </ShiftContext.Provider>
  );
}
export default ShiftContext;
