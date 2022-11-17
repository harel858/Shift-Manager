import classes from "./style/navigation.module.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiClock } from "react-icons/fi";
import { AiFillCaretDown } from "react-icons/ai";
import { Squash as Hamburger } from "hamburger-react";

export default function NavigationBar() {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(false);

  const changeBackground = () => {
    if (window.scrollY > 22) {
      setActiveNav(true);
    }
    if (window.scrollY === 0) {
      setActiveNav(false);
    }
  };
  useEffect(() => {
    function handleResize() {
      setOpen(false);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    changeBackground();
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground);
  }, []);

  const logOutHandler = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_KEY}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        console.log(res);
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className={!activeNav ? classes.nav : classes.activeNav}>
      <Link
        className={!isOpen ? classes.brand : classes.brandActive}
        to="/newShift"
      >
        Shift Manager <FiClock />
      </Link>
      <ul className={!isOpen ? classes.ul : classes.ulActive}>
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
            <Link to="/register">Add Account</Link>
            <Link onClick={logOutHandler} to="/">
              Log Out
            </Link>
          </div>
        </li>
      </ul>
      <button className={classes.hamburger}>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </button>
    </nav>
  );
}
