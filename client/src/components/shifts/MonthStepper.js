import classes from "./shiftsCss/monthStepper.module.css";
import { useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function MonthStepper(props) {
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  useEffect(() => {
    if (props.counter === 0) {
      for (let i = 0; i < props.months.length; i++) {
        if (currentMonth === props.months[i]) return props.setCounter(i);
      }
    }
  }, [currentMonth, props]);
  return (
    <div className={classes.container}>
      <ArrowBackIosNewIcon
        className={classes.btn}
        onClick={() =>
          props.setCounter((prev) => {
            if (props.counter === 1) return 12;
            return prev - 1;
          })
        }
      />
      <h3>{props.months[props.counter]}</h3>
      <ArrowForwardIosIcon
        className={classes.btn}
        onClick={() =>
          props.setCounter((prev) => {
            if (props.counter === 12) return 1;
            return prev + 1;
          })
        }
      />
    </div>
  );
}
