import ShiftItem from "./ShiftItem";
import classes from "./shiftsCss/list.module.css";
export default function ShiftList({ shiftList, forceUpdate }) {
  return (
    <>
      <div className={classes.shiftList}>
        {shiftList.map((shift, i) => (
          <ShiftItem
            index={i}
            key={i}
            forceUpdate={forceUpdate}
            shift={shift}
          />
        ))}
      </div>
    </>
  );
}
