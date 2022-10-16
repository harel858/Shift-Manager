import classes from "./shiftsCss/listContainer.module.css";

import ShiftTable from "./ShiftTable.js";

export default function ShiftList2({
  counter,
  setCounter,
  months,
  setMonths,
  shiftList,
}) {
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
