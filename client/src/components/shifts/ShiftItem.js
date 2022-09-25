import Card from "../ui/card.js";
import classes from "./shiftsCss/shiftItem.module.css";

export default function ShiftItem({ shift, index }) {
  console.log("ShiftItem");
  return (
    <>
      <Card shift={shift} index={index}>
        <li className={classes.data}>
          <p>start: </p>
          <p>{shift.start}</p>
        </li>
        <li className={classes.data}>
          <p>end: </p>
          <p>{shift.end}</p>
        </li>
        <li className={classes.data}>
          <p>Amount of time: </p>
          <p>{shift.timeSpending}</p>
        </li>
        <li className={classes.data}>
          <p>Total profit: </p>
          <p>{shift.totalProfit}$</p>
        </li>
      </Card>
    </>
  );
}
