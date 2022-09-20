import Card from "../ui/card.js";
import classes from "./shiftsCss/shiftItem.module.css";
import { BsTrash } from "react-icons/bs";
import { useContext } from "react";
import ShiftContext from "../../context/shiftContext.js";
import "./shiftItem.css";

export default function ShiftItem({ shift, index }) {
  const shiftCtx = useContext(ShiftContext);

  async function deleteItem() {
    const currentShift = document.getElementById(`${index}`);
    try {
      shiftCtx.deleteShift(shift._id);
      currentShift.classList.add("fall");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div id={index}>
      <Card>
        <li>
          <span>start: </span>
          {shift.start}
        </li>
        <li>
          <span>end: </span>
          {shift.end}
        </li>
        <li>
          <span>Amount of time: </span>
          {shift.timeSpending}
        </li>
        <li>
          <span>Total profit: </span>
          {shift.totalProfit}
        </li>
        <div className={classes.btns}>
          <BsTrash onClick={deleteItem} className={classes.trash} />
        </div>
      </Card>
    </div>
  );
}
