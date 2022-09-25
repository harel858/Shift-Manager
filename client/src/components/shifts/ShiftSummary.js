import classes from "./shiftsCss/summary.module.css";
import { useEffect, useState } from "react";

export default function ShiftSummary(props) {
  const [summary, setSummary] = useState({
    totalProfit: 0,
    amountOfShifts: props.shiftList.length,
    totalTimeSpending: 0,
  });
  useEffect(() => {
    const getData = () => {
      let totalProfit = 0;
      let totalSeconds = 0;
      for (let i = 0; i < props.shiftList.length; i++) {
        totalProfit = totalProfit + +props.shiftList[i].totalProfit;
        totalSeconds = totalSeconds + parseInt(props.shiftList[i].seconds);
      }
      let hrs = (`0` + Math.floor(totalSeconds / 3600)).slice(-2);
      let mins = `0` + Math.floor((totalSeconds - hrs * 3600) / 60);
      let secs = (`0` + (totalSeconds % 60)).slice(-2);

      let totalTimeSpending = `${hrs}:${mins}:${secs}`;
      return setSummary({
        totalProfit: totalProfit.toFixed(2),
        amountOfShifts: props.shiftList.length,
        totalTimeSpending: totalTimeSpending,
      });
    };
    getData();
  }, [props.shiftList]);
  console.log(summary);
  return (
    <ul className={classes.summaryContainer}>
      <li className={classes.summaryContent}>
        <h5>Total Profit:</h5>
        <h5>{summary.totalProfit}$</h5>
      </li>
      <li className={classes.summaryContent}>
        <h5>Total Work Time:</h5>
        <h5>{summary.totalTimeSpending}</h5>
      </li>
      <li className={classes.summaryContent}>
        <h5> Amount Of Shifts:</h5>
        <h5>{summary.amountOfShifts}</h5>
      </li>
    </ul>
  );
}
