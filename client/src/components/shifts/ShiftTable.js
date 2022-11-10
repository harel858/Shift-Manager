import "./shiftsCss/shiftTable.css";
import ShiftItem2 from "./ShiftItem2.js";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import LinearColor from "../ui/loading.js";

export default function ShiftTable({ counter, months, shiftList, error }) {
  if (loading) return <LinearColor />;

  if (error) {
    <Alert severity="error">
      <AlertTitle>Something went wrong</AlertTitle>
      <strong>WE ON THIS...</strong>
    </Alert>;
  }
  if (shiftList.length <= 0) {
    return (
      <Alert severity="info">
        <AlertTitle>You have no shifts for {months[counter]} yet </AlertTitle>
        <strong>KEEP ON GRINDING!</strong>
      </Alert>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          <td>Start</td>
          <td>End</td>
          <td>Time Spend</td>
          <td>Total Earning</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        {shiftList.map((shift) => (
          <ShiftItem2
            key={shift._id}
            counter={counter}
            months={months}
            shift={shift}
          />
        ))}
      </tbody>
    </table>
  );
}
