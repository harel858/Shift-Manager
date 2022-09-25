import { useState, createContext } from "react";

const ShiftContext = createContext({
  shifts: [],
  totalShifts: 0,
  addShift: (shift) => {},
  deleteShift: (shiftId) => {},
});

export function ShiftContextProvider(props) {
  const [shiftList, setShiftList] = useState([]);

  async function addShiftHandler(shift) {
    JSON.stringify(shift);
    setShiftList((prev) => [...prev, shift]);
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
          timeSpending: shift.timeSpending,
          totalProfit: shift.totalProfit,
          seconds: shift.seconds,
        }),
      });
      if (res.ok) {
        console.log(res);
      } else {
        const response = await res.json();
        throw response;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteShiftHandler(shiftId) {
    try {
      const res = await fetch("http://localhost:5000/shifts/delete", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: shiftId,
        }),
      });

      if (res.ok) {
        console.log(await res.json());
      }
    } catch (err) {
      throw err;
    }
  }

  const context = {
    shifts: shiftList,
    totalShifts: shiftList.length,
    addShift: addShiftHandler,
    deleteShift: deleteShiftHandler,
  };

  return (
    <ShiftContext.Provider value={context}>
      {props.children}
    </ShiftContext.Provider>
  );
}
export default ShiftContext;
