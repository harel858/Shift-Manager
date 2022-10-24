import classes from "./style/navigation.module.css";
import { Link } from "react-router-dom";
import { FiClock } from "react-icons/fi";
import { AiFillCaretDown } from "react-icons/ai";

export default function NavigationBar() {
  return (
    <nav className={classes.nav}>
      <Link className={classes.brand} to="/newShift">
        Shift Manager <FiClock />
      </Link>
      <ul className={classes.ul}>
        <li>
          <Link to="/newShift">New Shift</Link>
        </li>
        <li>
          <Link to="/allShifts">My Shifts</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li className={classes.dropDown}>
          <button className={classes.dropDownBtn}>
            user
            <AiFillCaretDown />
          </button>

          <div className={classes.dropDownContent}>
            <Link to="/register">switch account</Link>
            <Link to="/">login</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}
