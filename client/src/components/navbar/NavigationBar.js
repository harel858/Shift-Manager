import classes from "./style/navigation.module.css";
import { Link } from "react-router-dom";
import { FiClock } from "react-icons/fi";

export default function NavigationBar() {
  return (
    <nav className={classes.nav}>
      <a className={classes.brand} as={Link} to="/">
        Shift Manager <FiClock />
      </a>
      <ul className={classes.ul}>
        <li>New Shift</li>
        <li>My Shifts</li>
        <li>My Schedule</li>
        <li>
          <select>
            <option>definitions</option>
            <option>Register</option>
            <option>Switch account</option>
          </select>
        </li>
      </ul>
    </nav>
  );
}
