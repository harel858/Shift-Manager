import classes from "./shiftsCss/summary.module.css";
import { useMemo, useState, useContext } from "react";
import UserContext from "../../context/userContext.js";
import Slide from "@mui/material/Slide";

export default function ShiftSummary(props) {
  const { currency } = useContext(UserContext);

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
      let firstOvertimeEarn = 0;
      let overtimeEarn = 0;
      let totalSeconds = 0;
      for (let i = 0; i < props.shiftList.length; i++) {
        totalProfit = totalProfit + +props.shiftList[i].totalProfit;
        firstOvertimeEarn =
          firstOvertimeEarn + +props.shiftList[i].firstOverTime;
        overtimeEarn = overtimeEarn + +props.shiftList[i].overTime;
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
        firstOvertime: firstOvertimeEarn.toFixed(2),
        overtimeEarn: overtimeEarn.toFixed(2),
        totalTimeSpending: totalTimeSpending,
      });
    };
    getData();
  }, [props.shiftList]);
  return (
    <Slide direction="down" in={props.checked} mountOnEnter unmountOnExit>
      <ul className={classes.summaryContainer}>
        <li className={classes.summaryEarning}>
          <h5>Net Earning:</h5>
          <h5 className={classes.net}>
            {(summary.totalProfit - incomeTax).toFixed(2)}
            <span className={classes.currencyLabel}>{currency.label}</span>
          </h5>
        </li>
        <li className={classes.summaryEarning}>
          <h5>Gross Earning:</h5>
          <h5 className={classes.gross}>
            {summary.totalProfit}
            <span className={classes.currencyLabel}>{currency.label}</span>
          </h5>
        </li>
        <li className={classes.summaryEarning}>
          <h5>125% Earning:</h5>
          <h5>
            {summary.firstOvertime}
            <span className={classes.currencyLabel}>{currency.label}</span>
          </h5>
        </li>
        <li className={classes.summaryEarning}>
          <h5>150% Earning:</h5>
          <h5>
            {summary.overtimeEarn}
            <span className={classes.currencyLabel}>{currency.label}</span>
          </h5>
        </li>
        <li className={classes.tax}>
          <h5>Income Tax:</h5>
          <h5>
            -{incomeTax}
            <span className={classes.currencyLabel}>{currency.label}</span>
          </h5>
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
    </Slide>
  );
}
