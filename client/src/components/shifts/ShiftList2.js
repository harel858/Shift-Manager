import classes from "./shiftsCss/listContainer.module.css";
import ShiftTable from "./ShiftTable.js";

export default function ShiftList2({
  counter,
  setCounter,
  months,
  setMonths,
  shiftList,
}) {
  if (shiftList.length <= 0) {
    return (
      <header className={classes.noShifts}>
        <h1>you don't have any shifts</h1>
      </header>
    );
  }
  return (
    <>
      <div className={classes.listContainer}>
        <ShiftTable
          counter={counter}
          setCounter={setCounter}
          months={months}
          setMonths={setMonths}
          shiftList={shiftList}
        />
      </div>
    </>
  );
}
