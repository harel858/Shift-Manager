import classes from "./shiftsCss/summary.module.css";
import { useMemo, useState } from "react";

export default function ShiftSummary(props) {
  //Define A Summary Object
  const [summary, setSummary] = useState({
    totalProfit: 0,
    amountOfShifts: props.shiftList.length,
    totalTimeSpending: 0,
  });
  const [incomeTax, setIncomeTax] = useState();
  useMemo(() => {
    const getData = () => {
      // sum of earning and work seconds
      let totalProfit = 0;
      let totalSeconds = 0;
      for (let i = 0; i < props.shiftList.length; i++) {
        totalProfit = totalProfit + +props.shiftList[i].totalProfit;
        totalSeconds = totalSeconds + parseInt(props.shiftList[i].seconds);
      }
      //Calculation income Tax of Internal Revenue Service
      totalProfit < 6450 && setIncomeTax((totalProfit * 0.1).toFixed(2));
      if (totalProfit > 6450 && totalProfit < 9240)
        setIncomeTax((totalProfit * 0.14).toFixed(2));
      if (totalProfit > 14841 && totalProfit < 20620)
        setIncomeTax((totalProfit * 0.31).toFixed(2));
      if (totalProfit > 20621 && totalProfit < 42910)
        setIncomeTax((totalProfit * 0.35).toFixed(2));
      if (totalProfit > 42911 && totalProfit < 55270)
        setIncomeTax((totalProfit * 0.47).toFixed(2));
      totalProfit > 55271 && setIncomeTax((totalProfit * 0.5).toFixed(2));

      //display an stopwatch string
      let hrs = (`0` + Math.floor(totalSeconds / 3600)).slice(-2);
      let mins = (`0` + Math.floor((totalSeconds - hrs * 3600) / 60)).slice(-2);
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

  return (
    <ul className={classes.summaryContainer}>
      <li className={classes.summaryEarning}>
        <h5>Gross Earning:</h5>
        <h5>{summary.totalProfit}$</h5>
      </li>
      <li className={classes.summaryEarning}>
        <h5>Net Earning:</h5>
        <h5>{(summary.totalProfit - incomeTax).toFixed(2)}$</h5>
      </li>
      <li className={classes.tax}>
        <h5>Income Tax:</h5>
        <h5>-{incomeTax}$</h5>
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
