import classes from "./shiftsCss/summary.module.css";
import { useContext } from "react";
import UserContext from "../../context/userContext.js";
import Slide from "@mui/material/Slide";
import UseSummary from "../Hooks/useSummary";

export default function ShiftSummary({ checked, shiftList }) {
  const { summary, incomeTax } = UseSummary(shiftList);
  const { currency } = useContext(UserContext);
  /*  const summaryListItems = () => {
    const items = [
      {
        liClassName: classes.summaryEarning,
        title: `Net Earning:`,
        valueClassName: `classes.net`,
        value: (summary.totalProfit - incomeTax).toFixed(2),
        spanClassName: classes.currencyLabel,
        spanValue: currency.label,
      },
      {
        liClassName: classes.summaryEarning,
        title: `Gross Earning:`,
        valueClassName: `classes.gross`,
        value: summary.totalProfit,
        spanClassName: classes.currencyLabel,
        spanValue: currency.label,
      },
      {
        liClassName: classes.summaryEarning,
        title: `125% Earning:`,
        valueClassName: ``,
        value: summary.firstOvertime,
        spanClassName: classes.currencyLabel,
        spanValue: currency.label,
      },
      {
        liClassName: classes.summaryEarning,
        title: `150% Earning:`,
        valueClassName: ``,
        value: summary.overtimeEarn,
        spanClassName: classes.currencyLabel,
        spanValue: currency.label,
      },
      {
        liClassName: classes.tax,
        title: `Income Tax:`,
        valueClassName: ``,
        value: -{ incomeTax },
        spanClassName: classes.currencyLabel,
        spanValue: currency.label,
      },
    ];

    return items.map((item) => {
      const {
        liClassName,
        title,
        valueClassName,
        value,
        spanClassName,
        spanValue,
      } = item;

      <li className={liClassName}>
        <h5>{title}</h5>
        <h5 className={valueClassName}>{value}</h5>
        <span className={spanClassName}>{spanValue}</span>
      </li>;
    });
  }; */

  return (
    <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
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
