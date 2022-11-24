import classes from "./shiftsCss/summary.module.css";
import { useContext } from "react";
import UserContext from "../../context/userContext.js";
import Slide from "@mui/material/Slide";
import UseSummary from "../Hooks/useSummary";

export default function ShiftSummary({ checked, shiftList }) {
  const { summary, incomeTax } = UseSummary(shiftList);
  const { currency } = useContext(UserContext);

  const summaryListItems = () => {
    const items = [
      {
        liClassName: classes.summaryEarning,
        title: `Net Earning:`,
        valueClassName: classes.net,
        value: (summary.totalProfit - incomeTax).toFixed(2),
        spanClassName: classes.currencyLabel,
        spanValue: currency.label,
      },
      {
        liClassName: classes.summaryEarning,
        title: `Gross Earning:`,
        valueClassName: classes.gross,
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
        value: `-${incomeTax}`,
        spanClassName: classes.currencyLabel,
        spanValue: currency.label,
      },
      {
        liClassName: classes.summaryContent,
        title: `Total Time Spending:`,
        value: summary.totalTimeSpending,
      },
      {
        liClassName: classes.summaryContent,
        title: `Amount Of Shifts:`,
        value: summary.amountOfShifts,
      },
    ];

    return (
      <ul className={classes.summaryContainer}>
        {items.map((item, i) => {
          const {
            liClassName,
            title,
            valueClassName,
            value,
            spanClassName,
            spanValue,
          } = item;

          return (
            <li key={i} className={liClassName}>
              <h5>{title}</h5>
              <h5 className={valueClassName ? valueClassName : ""}>
                {value}
                {spanClassName && (
                  <span className={spanClassName}>{spanValue}</span>
                )}
              </h5>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
      {summaryListItems()}
    </Slide>
  );
}
