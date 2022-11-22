import { useMemo, useState } from "react";

export default function UseSummary(shiftList) {
  //Define A Summary Object
  const [summary, setSummary] = useState({
    totalProfit: 0,
    amountOfShifts: shiftList?.length,
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

      for (let i = 0; i < shiftList?.length; i++) {
        totalProfit = totalProfit + +shiftList[i].totalProfit;
        firstOvertimeEarn = firstOvertimeEarn + +shiftList[i].firstOverTime;
        overtimeEarn = overtimeEarn + +shiftList[i].overTime;
        totalSeconds = totalSeconds + parseInt(shiftList[i].seconds);
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
        amountOfShifts: shiftList.length,
        firstOvertime: firstOvertimeEarn.toFixed(2),
        overtimeEarn: overtimeEarn.toFixed(2),
        totalTimeSpending: totalTimeSpending,
      });
    };
    getData();
  }, [shiftList]);

  return {
    summary,
    incomeTax,
  };
}
