import "./shiftsCss/shiftTable.css";
import ShiftItem2 from "./ShiftItem2.js";

export default function ShiftTable({ counter, months, shiftList }) {
  return (
    <table>
      <thead>
        <tr>
          <td>Start</td>
          <td>End</td>
          <td>Time Spend</td>
          <td>Total Earning</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        {shiftList.map((shift) => (
          <ShiftItem2
            key={shift._id}
            counter={counter}
            months={months}
            shift={shift}
          />
        ))}
      </tbody>
    </table>
  );
}
