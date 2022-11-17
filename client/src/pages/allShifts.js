import ShiftList2 from "../components/shifts/ShiftList2.js";
import ShiftSummary from "../components/shifts/ShiftSummary.js";
import MonthStepper from "../components/shifts/MonthStepper.js";
import { useContext, useEffect, useState } from "react";
import ShiftContext from "../context/shiftContext.js";

function AllShifts() {
  const byDate = (a, b) => {
    const d1 = new Date(a.start);
    const d2 = new Date(b.start);

    if (d1.getUTCMonth() > d2.getUTCMonth()) {
      return 1;
    }
    if (d1.getUTCMonth() < d2.getUTCMonth()) {
      return -1;
    } else {
      return d1.getUTCDate - d2.getUTCDate();
    }
  };

  const { shifts, loading } = useContext(ShiftContext);
  const allShiftList = shifts.sort(byDate);

  const [counter, setCounter] = useState(0);
  const [months, setMonths] = useState([
    null,
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [shiftList, setShiftList] = useState([]);

  useEffect(() => {
    let shiftsOfMonth = [];
    allShiftList.map((shift, i) => {
      if (shift.date === months[counter]) {
        shift.index = i;
        shiftsOfMonth.push(shift);
      }
      return shiftsOfMonth;
    });
    return setShiftList(shiftsOfMonth);
  }, [counter, months, allShiftList]);

  return (
    <>
      {/*  <ShiftList shiftList={shiftList} /> */}
      <MonthStepper
        counter={counter}
        setCounter={setCounter}
        months={months}
        setMonths={setMonths}
      />
      <ShiftList2
        loading={loading}
        counter={counter}
        setCounter={setCounter}
        months={months}
        setMonths={setMonths}
        shiftList={shiftList}
      />
      <ShiftSummary
        counter={counter}
        setCounter={setCounter}
        months={months}
        setMonths={setMonths}
        shiftList={shiftList}
      />
    </>
  );
}
export default AllShifts;
