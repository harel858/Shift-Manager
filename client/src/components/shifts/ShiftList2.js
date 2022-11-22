import classes from "./shiftsCss/listContainer.module.css";
import { useContext } from "react";
import ShiftTable from "./ShiftTable.js";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import ShiftContext from "../../context/shiftContext";
import UserContext from "../../context/userContext";
import Slide from "@mui/material/Slide";
import Zoom from "@mui/material/Zoom";

export default function ShiftList2({
  counter,
  months,
  shiftList,
  loadingMonth,
  checked,
}) {
  const { loadingShift } = useContext(ShiftContext);
  const { loading } = useContext(UserContext);

  if (shiftList.length <= 0 && !loadingShift && !loading && !loadingMonth) {
    return (
      <Zoom in={true}>
        <Alert className={classes.noShiftAlert} severity="info">
          <AlertTitle>You have no shifts for {months[counter]} yet </AlertTitle>
          <strong>KEEP ON GRINDING!</strong>
        </Alert>
      </Zoom>
    );
  }
  return (
    <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
      <div className={classes.listContainer}>
        <ShiftTable counter={counter} months={months} shiftList={shiftList} />
      </div>
    </Slide>
  );
}
