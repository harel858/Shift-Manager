import classes from "./shiftsCss/listContainer.module.css";
import ShiftTable from "./ShiftTable.js";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function ShiftList2({
  counter,
  setCounter,
  months,
  setMonths,
  shiftList,
}) {
  if (shiftList.length <= 0) {
    return (
      <Alert className={classes.noShiftAlert} severity="error">
        <AlertTitle> You have no shifts for {months[counter]} yet </AlertTitle>
        <strong>KEEP ON GRINDING!</strong>
      </Alert>
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
