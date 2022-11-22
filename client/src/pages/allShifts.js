import ShiftList2 from "../components/shifts/ShiftList2.js";
import ShiftSummary from "../components/shifts/ShiftSummary.js";
import MonthStepper from "../components/shifts/MonthStepper.js";
import { useContext, useEffect, useState } from "react";
import ShiftContext from "../context/shiftContext.js";
import UserContext from "../context/userContext.js";
import LinearColor from "../components/ui/loading.js";

function AllShifts() {
  const [checked, setChecked] = useState(false);
  const [loadingMonth, setLoadingMonth] = useState(false);
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

  const { shifts, loadingShift } = useContext(ShiftContext);
  const { loading } = useContext(UserContext);
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
    setTimeout(() => {
      setChecked(true);
    }, 50);
  }, []);

  useEffect(() => {
    setLoadingMonth(true);
    let shiftsOfMonth = [];
    allShiftList.map((shift, i) => {
      if (shift.date === months[counter]) {
        shift.index = i;
        shiftsOfMonth.push(shift);
      }
      return shiftsOfMonth;
    });
    setShiftList(shiftsOfMonth);
    return setLoadingMonth(false);
  }, [counter, months, allShiftList]);

  if (loadingMonth || loading || loadingShift) return <LinearColor />;

  return (
    <>
      <MonthStepper
        checked={checked}
        counter={counter}
        setCounter={setCounter}
        months={months}
        setMonths={setMonths}
      />
      <ShiftList2
        checked={checked}
        loadingMonth={loadingMonth}
        counter={counter}
        months={months}
        shiftList={shiftList}
      />
      <ShiftSummary checked={checked} shiftList={shiftList} />
    </>
  );
}
export default AllShifts;
